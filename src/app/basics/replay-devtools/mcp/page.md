---
title: Replay MCP
description: Agentic time travel debugging for your application.
---

## Overview

AI Agents can use MCP to inspect a Replay recording. This accesses a set of debugging tools that the agent uses to inspect every detail of what happened within a recording.

Replay MCP is experimental. Reach out on [Discord](https://replay.io/discord) with any issues.

### Server Connection

The MCP server for a given recording can be accessed at `https://dispatch.replay.io/nut/recording/<recording-id>/mcp`. When recordings are protected by an API key, use that API key as the value of the `Authorization` header.

Examples of launching Claude Code with the MCP servers for specific recordings:

```sh
claude --mcp-config '{"mcpServers":{"replay":{"type":"http","url":"https://dispatch.replay.io/nut/recording/<recording-id>/mcp"}}}'
```

With an API key:

```sh
claude --mcp-config '{
  "mcpServers": {
    "replay": {
      "type": "http",
      "url": "https://dispatch.replay.io/nut/recording/<recording-id>/mcp",
      "headers": {
        "Authorization": API_KEY
      }
    }
  }
}'
```

When launched this way Claude Code will connect to the MCP server and use it to debug the recording according to any instructions you give it.  For example:

```text
use the replay MCP server you have access to and debug this test failure:

Error: Timed out 15000ms waiting for
      expect(locator).toBeVisible()
        Locator: getByTestId('products-table-action-edit-00000000-0000-4000-8000-000000000007')
        Expected: visible
        Received: <element(s) not found>
```
