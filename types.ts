
export interface SDKConfig {
  environment?: 'development' | 'production';
  apiKey?: string | null;
  chains?: string[];
  biometricEnabled?: boolean;
  egyptianIdVerification?: boolean;
  sessionTtlMs?: number;
  sessionStorage?: 'local' | 'none';
}

export interface UserSession {
  id: string;
  userId: string;
  method: string;
  createdAt: string;
  expiresAt: string;
  chains: string[];
  permissions: string[];
  ip: string;
  userAgent: string;
}

export interface AuthResult {
  success: boolean;
  user: SDKUser;
  session: UserSession;
  chains: string[];
  permissions: string[];
}

export interface SDKUser {
  id: string;
  username?: string;
  walletAddress: string;
  isPiPioneer?: boolean;
  isTeosHolder?: boolean;
  isExternalWallet?: boolean;
  piBalance?: number;
  teosBalance?: number;
  ertBalance?: number;
  joinDate: string;
  tier: string;
  permissions: string[];
}

export enum AuthMethod {
  PI = 'pi',
  TEOS = 'teos',
  WALLET = 'wallet'
}

export interface WalletInterface {
  getBalance(): Promise<number>;
  getAddress(): string;
}

export interface GovernanceInterface {
  createPetition(title: string): Promise<{ id: string; status: string }>;
  vote(id: string, option: string): Promise<{ success: boolean }>;
}
