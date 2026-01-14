export class Bitcoin {
  constructor({ network } = {}) {
    this.network = network ?? "mainnet";
  }
  async status() {
    return { chain: "bitcoin", ok: true, network: this.network };
  }
  async getBalance({ address }) {
    // Placeholder: integrate a BTC provider / indexer
    return "0";
  }
}
