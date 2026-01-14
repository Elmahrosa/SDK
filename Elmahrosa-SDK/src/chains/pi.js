/**
 * Pi Chain Wrapper (SDK)
 * Pi integration typically requires an official SDK + backend verification.
 * This wrapper provides a clean surface for apps; the actual connector is environment-specific.
 */
export class PiChain {
  constructor({ appId, endpoint } = {}) {
    this.appId = appId;
    this.endpoint = endpoint ?? "PI_CONNECTOR_REQUIRED";
  }

  authenticate(user) {
    if (!user) throw new Error("PiChain.authenticate: user required");
    return { user, appId: this.appId ?? null, status: "authenticated" };
  }

  pay(user, amount) {
    if (!user) throw new Error("PiChain.pay: user required");
    if (typeof amount !== "number" || amount <= 0) throw new Error("PiChain.pay: amount must be > 0");
    return { user, amount, status: "paid", note: "Requires Pi backend verification in production" };
  }
}
