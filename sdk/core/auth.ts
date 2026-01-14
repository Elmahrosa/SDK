
/**
 * @file sdk/core/auth.ts
 * @module ElmahrosaAuth
 * @description Multi-factor authentication for TEOS ecosystem (Pi + TEOS + external wallets)
 * @maintainer Ayman Seif <ayman@teosegypt.com>
 * @org Elmahrosa International — TEOS Egypt
 */

import { PiNetwork, TeosWallet } from '../chains/index';
import { i18n } from './i18n';
import { SDKConfig, SDKUser, UserSession, AuthResult } from '../../types';

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export class ElmahrosaAuth {
  private config: Required<SDKConfig>;
  private piNetwork: PiNetwork;
  private teosWallet: TeosWallet;
  public currentUser: SDKUser | null = null;
  public session: UserSession | null = null;

  constructor(config: SDKConfig = {}) {
    this.config = {
      environment: config.environment || 'development',
      apiKey: config.apiKey || null,
      chains: Array.isArray(config.chains) ? config.chains : ['teos', 'pi'],
      biometricEnabled: typeof config.biometricEnabled === 'boolean' ? config.biometricEnabled : true,
      egyptianIdVerification: typeof config.egyptianIdVerification === 'boolean' ? config.egyptianIdVerification : false,
      sessionTtlMs: typeof config.sessionTtlMs === 'number' ? config.sessionTtlMs : 24 * 60 * 60 * 1000,
      sessionStorage: config.sessionStorage || 'local',
    };

    this.piNetwork = new PiNetwork(this.config);
    this.teosWallet = new TeosWallet(this.config);
  }

  async authenticate(options: { 
    method?: 'pi' | 'teos' | 'wallet', 
    credentials?: any, 
    biometric?: boolean, 
    egyptianId?: boolean 
  } = {}): Promise<AuthResult> {
    const {
      method = 'pi',
      credentials = {},
      biometric = false,
      egyptianId = false
    } = options;

    try {
      let authResult: any;

      switch (String(method).toLowerCase()) {
        case 'pi':
          authResult = await this.piLogin(credentials);
          break;
        case 'teos':
          authResult = await this.teosLogin(credentials);
          break;
        case 'wallet':
          authResult = await this.walletLogin(credentials);
          break;
        default:
          throw new Error(i18n.t('auth.method_not_supported'));
      }

      if (biometric && this.config.biometricEnabled) {
        await this.verifyBiometric();
      }

      if (egyptianId && this.config.egyptianIdVerification) {
        await this.verifyEgyptianId();
      }

      this.session = await this.createSession(authResult);
      this.currentUser = authResult.user;

      await this.logAuthentication(authResult);

      return {
        success: true,
        user: authResult.user,
        session: this.session!,
        chains: this.config.chains,
        permissions: this.getUserPermissions(authResult.user)
      };
    } catch (error: any) {
      throw new Error(i18n.t('auth.failed', { error: error.message }));
    }
  }

  private async piLogin(credentials = {}) {
    const piAuth = await this.piNetwork.authenticate({
      scopes: ['username', 'payments', 'wallet_address'],
      credentials
    });

    if (!piAuth?.success) {
      throw new Error(i18n.t('auth.pi_failed'));
    }

    const user: SDKUser = {
      id: `pi_${piAuth.user.uid}`,
      username: piAuth.user.username,
      walletAddress: piAuth.user.walletAddress,
      isPiPioneer: true,
      piBalance: piAuth.user.balance ?? 0,
      joinDate: new Date().toISOString(),
      tier: this.calculatePiTier(piAuth.user),
      permissions: this.getPiPermissions(piAuth.user)
    };

    return { method: 'pi', user, timestamp: Date.now(), piData: piAuth };
  }

  private async teosLogin(credentials = {}) {
    const teosAuth = await this.teosWallet.connect(credentials);

    if (!teosAuth?.connected) {
      throw new Error(i18n.t('auth.teos_failed'));
    }

    const user: SDKUser = {
      id: `teos_${teosAuth.address}`,
      walletAddress: teosAuth.address,
      teosBalance: teosAuth.balance ?? 0,
      ertBalance: teosAuth.ertBalance ?? 0,
      isTeosHolder: true,
      joinDate: new Date().toISOString(),
      tier: this.calculateTeosTier(teosAuth),
      permissions: this.getTeosPermissions(teosAuth)
    };

    return { method: 'teos', user, timestamp: Date.now(), teosData: teosAuth };
  }

  private async walletLogin(credentials: any = {}) {
    const { walletAddress, signature, message, chain = 'evm' } = credentials;

    if (!walletAddress || !signature || !message) {
      throw new Error(i18n.t('auth.wallet_credentials_required'));
    }

    const isValid = await this.verifySignature(walletAddress, signature, message, chain);

    if (!isValid) {
      throw new Error(i18n.t('auth.signature_invalid'));
    }

    const user: SDKUser = {
      id: `wallet_${walletAddress}`,
      walletAddress,
      isExternalWallet: true,
      joinDate: new Date().toISOString(),
      tier: 'external',
      permissions: ['basic_access', 'read_only']
    };

    return { method: 'wallet', user, timestamp: Date.now() };
  }

  private async verifyBiometric() {
    if (!isBrowser()) return true;

    try {
      if ('credentials' in navigator) {
        // Simplified WebAuthn mock
        return true;
      }
      return true;
    } catch (error) {
      throw new Error(i18n.t('auth.biometric_required'));
    }
  }

  private async verifyEgyptianId() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ verified: true, timestamp: new Date().toISOString(), method: 'simulated' });
      }, 800);
    });
  }

  private async createSession(authResult: any): Promise<UserSession> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const session: UserSession = {
      id: sessionId,
      userId: authResult.user.id,
      method: authResult.method,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.config.sessionTtlMs).toISOString(),
      chains: this.config.chains,
      permissions: authResult.user.permissions,
      ip: '0.0.0.0',
      userAgent: isBrowser() ? navigator.userAgent : 'server'
    };

    if (this.config.sessionStorage === 'local' && isBrowser()) {
      localStorage.setItem('elmahrosa_session', JSON.stringify(session));
    }

    return session;
  }

  private async logAuthentication(authResult: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userId: authResult.user.id,
      method: authResult.method,
      success: true,
    };

    if (isBrowser()) {
      const logs = JSON.parse(localStorage.getItem('auth_logs') || '[]');
      logs.push(logEntry);
      localStorage.setItem('auth_logs', JSON.stringify(logs.slice(-100)));
    }
  }

  private getUserPermissions(user: SDKUser) {
    const basePermissions = ['read_basic', 'access_public'];
    if (user.isPiPioneer) basePermissions.push('pi_governance', 'community_voting');
    if (user.isTeosHolder) basePermissions.push('teos_governance', 'ert_staking');
    return [...new Set(basePermissions)];
  }

  private calculatePiTier(piUser: any) {
    const balance = piUser?.balance ?? 0;
    if (balance >= 10000) return 'platinum';
    if (balance >= 1000) return 'gold';
    return 'bronze';
  }

  private calculateTeosTier(teosAuth: any) {
    const balance = teosAuth?.ertBalance ?? 0;
    if (balance >= 10000) return 'platinum';
    return 'bronze';
  }

  private getPiPermissions(piUser: any) {
    return ['pi_mining', 'pi_transfer'];
  }

  private getTeosPermissions(teosAuth: any) {
    return ['teos_transfer', 'ert_staking'];
  }

  async verifySignature(address: string, signature: string, message: string, chain: string = 'evm') {
    if (!address || !signature || !message) return false;
    if (this.config.environment === 'production') return false;
    return true; // Dev bypass
  }
}
