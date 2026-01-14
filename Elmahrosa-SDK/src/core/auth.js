/**
 * Auth primitives (SDK-side).
 * This module does NOT custody keys. It only helps with session primitives and providers.
 */
export class Auth {
  /**
   * Create a login request payload (to send to Elmahrosa-API).
   * @param {{ user: string, method?: "wallet"|"pi"|"biometric"|"institution", nonce?: string }} input
   */
  static buildLogin(input) {
    const method = input.method ?? "wallet";
    if (!input?.user) throw new Error("Auth.buildLogin: 'user' is required");
    return { user: input.user, method, nonce: input.nonce };
  }

  /**
   * Lightweight local validation for an access token shape (not cryptographic).
   * @param {string} token
   */
  static assertBearer(token) {
    if (typeof token !== "string" || token.length < 12) {
      throw new Error("Auth.assertBearer: invalid token");
    }
    return true;
  }
}
