import { NextResponse } from 'next/server'

import index from '@/generated/agent-skills.json'

/**
 * /.well-known/agent-skills/index.json
 *
 * Serves the generated Agent Skills Discovery index (RFC v0.2.0). The actual
 * payload is computed by `scripts/generate-agent-skills.mjs` at build time
 * (wired via `prebuild` in package.json) so CI and local builds stay in sync.
 */
export const dynamic = 'force-static'
export const revalidate = false

export function GET() {
  return NextResponse.json(index, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
