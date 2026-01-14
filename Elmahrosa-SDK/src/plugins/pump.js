export class Pump {
  constructor({ apiBaseUrl } = {}) {
    this.apiBaseUrl = apiBaseUrl ?? "ELMAHROSA_API_REQUIRED";
  }
  buildLaunch({ symbol, supply, feeSol = 0.1 }) {
    if (!symbol) throw new Error("Pump.buildLaunch: symbol required");
    if (!Number.isFinite(supply) || supply <= 0) throw new Error("Pump.buildLaunch: supply must be > 0");
    return { symbol, supply, feeSol };
  }
}
