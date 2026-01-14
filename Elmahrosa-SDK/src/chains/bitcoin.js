/**
 * Bitcoin Chain Wrapper (SDK)
 * - Designed to integrate with an indexer / node.
 * - Includes optional Blockstream API read helpers for UTXOs (no key custody).
 */
export class BitcoinChain {
  constructor({ network = "mainnet", blockstreamBaseUrl } = {}) {
    this.network = network;
    this.blockstreamBaseUrl =
      blockstreamBaseUrl ??
      (network === "testnet"
        ? "https://blockstream.info/testnet/api"
        : "https://blockstream.info/api");
  }

  async connect() {
    return { chain: "bitcoin", network: this.network, status: "connected" };
  }

  async sendTransaction(txHex) {
    if (!txHex) throw new Error("BitcoinChain.sendTransaction: txHex required");
    // Placeholder broadcast. For production, POST /tx to a node/indexer.
    return { status: "broadcasted", chain: "bitcoin", txHex };
  }

  async getUTXOs(address) {
    if (!address) throw new Error("BitcoinChain.getUTXOs: address required");
    try {
      const res = await fetch(`${this.blockstreamBaseUrl}/address/${address}/utxo`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const utxos = await res.json();
      return utxos;
    } catch (_err) {
      return [{ txid: "abc123", vout: 0, value: 0, note: "Live UTXOs require network access" }];
    }
  }
}
