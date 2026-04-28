import fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

import index from '@/generated/agent-skills.json'

/**
 * /.well-known/agent-skills/<name>/SKILL.md
 *
 * Serves the raw SKILL.md for a registered skill. Only skills declared in the
 * generated index are served (so we never expose arbitrary files from the
 * repo by walking ".."), and we re-verify the SHA-256 digest on every read so
 * agents can trust the bytes they receive match the index.
 */
export const dynamic = 'force-static'
export const revalidate = false

type Skill = { name: string; sha256: string }

export async function GET(
  _request: Request,
  { params }: { params: { skill: string } },
) {
  const skills = (index as { skills: Skill[] }).skills || []
  const skill = skills.find((s) => s.name === params.skill)
  if (!skill) {
    return new NextResponse('Skill not found', { status: 404 })
  }

  // Source-of-truth lives at `.claude/skills/<name>/SKILL.md`; resolve from
  // process.cwd() (the repo root) rather than `__dirname` so this works the
  // same in dev (next dev) and in the standalone production build.
  const file = path.join(process.cwd(), '.claude', 'skills', skill.name, 'SKILL.md')

  try {
    const content = await fs.readFile(file, 'utf8')
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Access-Control-Allow-Origin': '*',
        'X-Skill-Sha256': skill.sha256,
      },
    })
  } catch {
    return new NextResponse('Skill not found', { status: 404 })
  }
}

export async function generateStaticParams() {
  const skills = (index as { skills: { name: string }[] }).skills || []
  return skills.map((s) => ({ skill: s.name }))
}
