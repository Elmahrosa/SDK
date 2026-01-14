# Contributing to Elmahrosa SDK

Thank you for contributing. This project values **auditability**, **clarity**, and **modularity**.

## Workflow
1. Fork the repository
2. Create a feature branch: `feat/<topic>` or `fix/<topic>`
3. Add tests for behavior changes
4. Open a Pull Request with:
   - what changed
   - why it changed
   - how to test

## Engineering rules
- Keep adapters deterministic and side-effect minimal
- No private keys or secrets in code or tests
- Prefer non-custodial flows (build + sign + submit)
- All plugin actions should be traceable (log hooks)

## Style
- ESM modules
- JSDoc on public APIs
- Prefer small functions and clear errors

## Security
If you discover a vulnerability, do **not** open a public issue.  
Email the maintainers per `docs/SECURITY.md`.

