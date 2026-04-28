# Replay Docs — Reference

Canonical URL: https://docs.replay.io/reference

The Reference section is the complete, exhaustive reference for the Replay
platform.

## Test Runners

Replay's first-party test-runner integrations:

- [Overview](https://docs.replay.io/reference/test-runners/overview)
- [Cypress](https://docs.replay.io/reference/test-runners/cypress)
- [Playwright](https://docs.replay.io/reference/test-runners/playwright)
- [GitHub Actions setup (Playwright)](https://docs.replay.io/reference/test-runners/playwright/github-actions)

## Integrations / APIs

- [Replay Protocol](https://docs.replay.io/reference/integrations/replay-apis/replay-protocol)
- Protocol docs: https://static.replay.io/protocol/tot/
- GraphQL API: https://api.replay.io/v1/graphql

## Replay CLI

The `replayio` CLI installs the Replay browser, records sessions, and uploads
them. See https://github.com/replayio/replay-cli/tree/main/packages/replayio.

## Replay MCP server

- Public endpoint: https://mcp.replay.io
- Server card: https://docs.replay.io/.well-known/mcp/server-card.json

## Authentication

Replay uses OAuth 2.0 / OIDC for API access. Discovery metadata:

- OIDC: https://docs.replay.io/.well-known/openid-configuration
- OAuth Protected Resource: https://docs.replay.io/.well-known/oauth-protected-resource
