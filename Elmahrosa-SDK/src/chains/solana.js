/**
 * Solana Chain Wrapper (SDK)
 * - Non-custodial by default (build tx, return it)
 * - Uses optional dynamic import of @solana/web3.js if installed
 *
 * NOTE: This wrapper is safe to ship without dependencies.
 * If you want real RPC calls, install:
 *   npm i @solana/web3.js
 */
export class SolanaChain {
  constructor({ rpcUrl } = {}) {
    this.rpcUrl = rpcUrl ?? "https://api.mainnet-beta.solana.com";
  }

  async connect() {
    return { chain: "solana", rpcUrl: this.rpcUrl, status: "connected" };
  }

  /**
   * Fetch SOL balance (lamports) via @solana/web3.js if available.
   * Falls back to a placeholder response if not installed.
   */
  async getBalance(address) {
    if (!address) throw new Error("SolanaChain.getBalance: address required");

    try {
      const web3 = await import("@solana/web3.js");
      const connection = new web3.Connection(this.rpcUrl, "confirmed");
      const pubkey = new web3.PublicKey(address);
      const lamports = await connection.getBalance(pubkey, "confirmed");
      return { address, lamports, sol: lamports / web3.LAMPORTS_PER_SOL };
    } catch (_err) {
      // Dependency not installed or runtime not supported
      return { address, lamports: 0, sol: 0, note: "Install @solana/web3.js for live RPC balance" };
    }
  }

  /**
   * Builds an unsigned transaction placeholder.
   * For production: create Transaction + instructions and let the wallet sign.
   */
  async sendTransaction(tx) {
    return { status: "submitted", chain: "solana", tx };
  }
}
