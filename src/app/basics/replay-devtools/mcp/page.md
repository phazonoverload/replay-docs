---
title: Replay MCP
description: Agentic time travel debugging for your application.
---

## Overview

AI Agents can use MCP to inspect a Replay recording. This provides a set of debugging tools that the agent uses to inspect every detail of what happened within a recording.

Replay MCP is experimental. Reach out on [Discord](https://replay.io/discord) with any issues.

Load the [Replay MCP Skill](https://raw.githubusercontent.com/replayio/docs/refs/heads/main/src/app/basics/replay-devtools/mcp/skill.md) into your agent to teach it how to use these tools.

### Server Connection (Universal)

An MCP server able to inspect any recording is at `https://dispatch.replay.io/nut/mcp`. All tools take a recording ID parameter in addition to any other parameters.

In order to access recordings protected by an API key, use that API key as the value of the `Authorization` header.

Examples of launching Claude Code with the MCP servers for any recording:

```sh
claude --mcp-config '{"mcpServers":{"replay":{"type":"http","url":"https://dispatch.replay.io/nut/mcp"}}}'
```

With an API key:

```sh
claude --mcp-config '{
  "mcpServers": {
    "replay": {
      "type": "http",
      "url": "https://dispatch.replay.io/nut/mcp",
      "headers": {
        "Authorization": API_KEY
      }
    }
  }
}'
```

When launched this way Claude Code will connect to the MCP server and use it to inspect any recordings whose ID it knows.  For example:

```text
use the replay MCP server you have access to and debug this test failure in recording <recording-id>:

Error: Timed out 15000ms waiting for
      expect(locator).toBeVisible()
        Locator: getByTestId('products-table-action-edit-00000000-0000-4000-8000-000000000007')
        Expected: visible
        Received: <element(s) not found>
```

### Server Connection (Per Recording)

MCP servers specific to particular recordings can be used as well. Tool calls on this server do not need to specify the recording ID, simplifying the interface, but the recording ID needs to be known ahead of time to compute the server URL.

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

When launched this way Claude Code will connect to the MCP server and use it to debug the specific recording according to any instructions you give it.  For example:

```text
use the replay MCP server you have access to and debug this test failure:

Error: Timed out 15000ms waiting for
      expect(locator).toBeVisible()
        Locator: getByTestId('products-table-action-edit-00000000-0000-4000-8000-000000000007')
        Expected: visible
        Received: <element(s) not found>
```

## Tips

Make sure recordings you examine either use development builds or have source maps available to make it easier for the agent to understand what the app's code is doing.
