/**
 * Wallet model (local state + operation builders).
 * Note: For real chain interactions, use chain adapters in src/chains/.
 */
export class Wallet {
  constructor(owner, balances = {}) {
    if (!owner) throw new Error("Wallet: owner is required");
    this.owner = owner;
    this.balances = { ...balances };
  }

  getBalance(token) {
    return Number(this.balances?.[token] ?? 0);
  }

  /**
   * Builds a transfer payload (for API or adapter usage).
   */
  buildTransfer({ token, amount, to, chain = "solana", memo, mode = "noncustodial" }) {
    if (!token) throw new Error("Wallet.buildTransfer: token is required");
    if (!to) throw new Error("Wallet.buildTransfer: to is required");
    if (typeof amount !== "number" || amount <= 0) throw new Error("Wallet.buildTransfer: amount must be > 0");
    return { from: this.owner, to, token, amount, chain, memo, mode };
  }

  /**
   * Builds a mint payload (role/policy gated server-side).
   */
  buildMint({ token, amount, to = this.owner, chain = "solana" }) {
    if (!token) throw new Error("Wallet.buildMint: token is required");
    if (typeof amount !== "number" || amount <= 0) throw new Error("Wallet.buildMint: amount must be > 0");
    return { to, token, amount, chain };
  }

  /**
   * Local-only convenience mutation (not a real mint on-chain).
   */
  credit(token, amount) {
    if (typeof amount !== "number" || amount <= 0) throw new Error("Wallet.credit: amount must be > 0");
    this.balances[token] = this.getBalance(token) + amount;
    return this.getBalance(token);
  }
}
