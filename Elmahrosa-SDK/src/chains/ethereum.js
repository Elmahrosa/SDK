/**
 * Ethereum Chain Wrapper (SDK)
 * Uses optional dynamic import of ethers.
 *
 * Install for live RPC:
 *   npm i ethers
 */
export class EthereumChain {
  constructor(providerUrl) {
    this.providerUrl = providerUrl;
    this._provider = null;
  }

  async _getProvider() {
    if (this._provider) return this._provider;
    if (!this.providerUrl) throw new Error("EthereumChain: providerUrl required");
    const { ethers } = await import("ethers");
    this._provider = new ethers.JsonRpcProvider(this.providerUrl);
    return this._provider;
  }

  async connect() {
    await this._getProvider();
    return { chain: "ethereum", providerUrl: this.providerUrl, status: "connected" };
  }

  async getBalance(address) {
    if (!address) throw new Error("EthereumChain.getBalance: address required");
    const { ethers } = await import("ethers");
    const provider = await this._getProvider();
    const bal = await provider.getBalance(address);
    return { address, wei: bal.toString(), eth: ethers.formatEther(bal) };
  }

  async sendTransaction(tx) {
    // Non-custodial default: tx should be signed by client wallet before broadcast.
    return { status: "pending", chain: "ethereum", tx };
  }
}
