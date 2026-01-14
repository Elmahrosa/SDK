export class Bnb {
  constructor({ rpcUrl, chainId } = {}) {
    this.rpcUrl = rpcUrl ?? "https://bsc-dataseed.binance.org";
    this.chainId = chainId ?? 56;
  }
  async status() {
    return { chain: "bnb", ok: true, rpcUrl: this.rpcUrl, chainId: this.chainId };
  }
}
