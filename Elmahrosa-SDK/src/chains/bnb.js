/**
 * BNB Chain Wrapper (SDK)
 * BNB Chain is an EVM chain.
 */
export class BNBChain {
  constructor(providerUrl) {
    this.providerUrl = providerUrl ?? "https://bsc-dataseed.binance.org";
  }

  async connect() {
    return { chain: "bnb", providerUrl: this.providerUrl, status: "connected" };
  }

  async sendTransaction(tx) {
    return { status: "pending", chain: "bnb", tx };
  }
}
