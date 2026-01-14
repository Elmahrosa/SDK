
import { ElmahrosaAuth, wallet, governance } from './core/index';
import { SDKConfig } from '../types';

/**
 * ElmahrosaSDK - Sovereign Developer Toolkit
 * @maintainer Ayman Seif <ayman@teosegypt.com>
 */
export class ElmahrosaSDK {
  public auth: ElmahrosaAuth;
  
  constructor(public config: SDKConfig = {}) {
    this.auth = new ElmahrosaAuth(config);
  }

  get wallet() {
    return wallet;
  }

  get governance() {
    return governance;
  }
}
