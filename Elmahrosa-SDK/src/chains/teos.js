/**
 * TEOS Sovereign Chain Wrapper (SDK)
 * Starter in-memory ledger model for demos.
 * For production, connect to TEOS node / Elmahrosa-API sovereign endpoints.
 */
export class TEOSChain {
  constructor() {
    this.ledger = {};
  }

  mint(token, amount, to) {
    if (!token) throw new Error("TEOSChain.mint: token required");
    if (!to) throw new Error("TEOSChain.mint: to required");
    if (typeof amount !== "number" || amount <= 0) throw new Error("TEOSChain.mint: amount must be > 0");

    if (!this.ledger[to]) this.ledger[to] = {};
    this.ledger[to][token] = (this.ledger[to][token] || 0) + amount;

    return { to, token, amount, status: "minted" };
  }

  transfer(token, amount, from, to) {
    if (!token) throw new Error("TEOSChain.transfer: token required");
    if (!from || !to) throw new Error("TEOSChain.transfer: from/to required");
    if (typeof amount !== "number" || amount <= 0) throw new Error("TEOSChain.transfer: amount must be > 0");

    if (!this.ledger[from] || (this.ledger[from][token] || 0) < amount) {
      throw new Error("Insufficient balance");
    }
    if (!this.ledger[to]) this.ledger[to] = {};

    this.ledger[from][token] -= amount;
    this.ledger[to][token] = (this.ledger[to][token] || 0) + amount;

    return { from, to, token, amount, status: "transferred" };
  }

  balance(address, token) {
    if (!address || !token) throw new Error("TEOSChain.balance: address/token required");
    return this.ledger[address]?.[token] || 0;
  }
}
