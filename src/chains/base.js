export class Base {
  constructor({ rpcUrl, chainId } = {}) {
    this.rpcUrl = rpcUrl ?? "https://mainnet.base.org";
    this.chainId = chainId ?? 8453;
  }
  async status() {
    return { chain: "base", ok: true, rpcUrl: this.rpcUrl, chainId: this.chainId };
  }
}
