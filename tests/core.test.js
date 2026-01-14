import test from "node:test";
import assert from "node:assert/strict";
import { Auth } from "../src/core/auth.js";
import { Wallet } from "../src/core/wallet.js";
import { Governance } from "../src/core/governance.js";
import { I18n } from "../src/core/i18n.js";

test("Auth.buildLogin requires user", () => {
  assert.throws(() => Auth.buildLogin({ method: "wallet" }));
});

test("Wallet builds transfer payload", () => {
  const w = new Wallet("alice", { TEOS: 10 });
  const payload = w.buildTransfer({ token: "TEOS", amount: 1, to: "bob" });
  assert.equal(payload.from, "alice");
  assert.equal(payload.to, "bob");
});

test("Governance petition threshold", () => {
  const g = new Governance();
  const p = g.createPetition({ title: "Test", creator: "alice", threshold: 2 });
  const a = g.votePetition({ id: p.id });
  assert.equal(a.reached, false);
  const b = g.votePetition({ id: p.id });
  assert.equal(b.reached, true);
});

test("I18n detects Arabic", async () => {
  assert.equal(I18n.detectLanguage("مرحبا"), "ar");
});
