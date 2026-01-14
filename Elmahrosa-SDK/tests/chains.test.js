import test from "node:test";
import assert from "node:assert/strict";
import { TEOSChain } from "../src/chains/teos.js";

test("TEOSChain mint/transfer/balance", () => {
  const teos = new TEOSChain();
  teos.mint("TEOS", 100, "alice");
  assert.equal(teos.balance("alice", "TEOS"), 100);
  teos.transfer("TEOS", 30, "alice", "bob");
  assert.equal(teos.balance("alice", "TEOS"), 70);
  assert.equal(teos.balance("bob", "TEOS"), 30);
});
