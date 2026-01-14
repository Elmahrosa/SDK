/**
 * Base Chain Wrapper (SDK)
 * Base is an EVM chain. This wrapper is a thin alias of an EVM connector pattern.
 */
export class BaseChain {
  constructor(providerUrl) {
    this.providerUrl = providerUrl ?? "https://mainnet.base.org";
  }

  async connect() {
    return { chain: "base", providerUrl: this.providerUrl, status: "connected" };
  }

  async sendTransaction(tx) {
    return { status: "pending", chain: "base", tx };
  }
}
