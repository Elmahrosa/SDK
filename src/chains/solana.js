export class Solana {
  constructor({ rpcUrl } = {}) {
    this.rpcUrl = rpcUrl ?? "https://api.mainnet-beta.solana.com";
  }
  async status() {
    return { chain: "solana", ok: true, rpcUrl: this.rpcUrl };
  }
  async getBalance({ address, token }) {
    // Placeholder: integrate @solana/web3.js and token program
    return "0";
  }
  async transfer(payload) {
    // Placeholder: build tx and return unsigned tx for non-custodial signing
    return { chain: "solana", mode: payload?.mode ?? "noncustodial", tx: "UNSIGNED_TX_PLACEHOLDER" };
  }
}
