# Security

## Reporting
Please report vulnerabilities privately.

## Baseline rules
- No secrets committed
- Non-custodial by default
- Validate inputs and normalize errors
- Provide requestId hooks where used alongside Elmahrosa-API

## Recommended usage
For institutional deployments, pair this SDK with:
- Elmahrosa-API (service layer)
- policy engine (compliance)
- audit logging (immutable or append-only)
