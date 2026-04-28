# Replay Documentation

Canonical URL: https://docs.replay.io/

Replay is the first deterministic browser. Once a bug or flaky test is captured,
anyone can inspect it with browser DevTools without having to reproduce it
locally.

This documentation site is the canonical reference for using Replay. The
top-level sections are:

- [Basics](https://docs.replay.io/basics) — getting started, recording your
  app, recording test suites (Cypress, Playwright), time-travel debugging,
  Replay DevTools, and the Test Suite Dashboard.
- [Learn](https://docs.replay.io/learn) — guided tutorials, framework-specific
  examples, and conceptual deep-dives on how Replay works.
- [Reference](https://docs.replay.io/reference) — exhaustive reference for the
  Replay APIs, the Replay Protocol, the Replay CLI, and supported test runners.

## Machine-readable surfaces

- `/.well-known/api-catalog` — RFC 9727 catalog of Replay APIs (linkset+json)
- `/.well-known/mcp/server-card.json` — Replay MCP server card
- `/.well-known/agent-skills/index.json` — Replay agent skills (Replay CLI,
  Cypress, Playwright, MCP)
- `/.well-known/openid-configuration` — OAuth/OIDC discovery for the Replay
  authentication tenant
- `/sitemap.xml` — full URL inventory
- `/robots.txt` — crawl + AI-bot policy with `Content-Signal`

## Content usage

This documentation may be indexed for search and used as grounding context for
AI agents (`Content-Signal: search=yes, ai-input=yes, ai-train=no`). It must
not be ingested into model training corpora.

## Contact

- Product site: https://www.replay.io
- App: https://app.replay.io
- Discord: https://replay.io/discord
- GitHub: https://github.com/replayio
