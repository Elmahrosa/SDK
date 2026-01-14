export class Teos {
  constructor({ endpoint } = {}) {
    this.endpoint = endpoint ?? "TEOS_NODE_REQUIRED";
  }
  async status() {
    return { chain: "teos", ok: Boolean(this.endpoint && this.endpoint !== "TEOS_NODE_REQUIRED"), endpoint: this.endpoint };
  }
}
