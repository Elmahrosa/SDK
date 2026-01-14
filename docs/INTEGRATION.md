# Integration Guide (Starter)

## Recommended architecture
- Use Elmahrosa-SDK in clients/services for request building and normalization.
- Use Elmahrosa-API for execution, policy enforcement, and auditing.

## Quick pattern
1) Connect wallet
2) Build operation (transfer/mint/stake)
3) Sign (wallet)
4) Submit (API or direct chain adapter)
