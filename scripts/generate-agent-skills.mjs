#!/usr/bin/env node
/**
 * scripts/generate-agent-skills.mjs
 *
 * Walks `.claude/skills/<skill>/SKILL.md`, computes a SHA-256 digest for
 * each one, and writes a single JSON index to
 * `src/generated/agent-skills.json`. The /.well-known/agent-skills/index.json
 * route handler imports that file and serves it.
 *
 * Run via `pnpm prebuild` or `pnpm agent-skills`. `src/generated/agent-skills.json`
 * is committed (see .gitignore) so bare `next build` / CI linters still resolve it;
 * regenerate and commit after editing any SKILL.md.
 *
 * The `OMIT_FROM_AGENT_SKILLS_INDEX` set drops skills from the public index
 * while keeping `.claude/skills` sources in the repo (e.g. replay-cypress).
 */

import { createHash } from 'node:crypto'
import {
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = join(ROOT, '.claude', 'skills')
const OUT_DIR = join(ROOT, 'src', 'generated')
const OUT_FILE = join(OUT_DIR, 'agent-skills.json')

/** Kept out of /.well-known/agent-skills until we surface Cypress again. */
const OMIT_FROM_AGENT_SKILLS_INDEX = new Set(['replay-cypress'])

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://docs.replay.io'

function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return {}
  const body = match[1]
  const meta = {}
  for (const line of body.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) continue
    meta[m[1]] = m[2].trim()
  }
  return meta
}

function discoverSkills() {
  if (!existsSync(SKILLS_DIR)) return []
  const entries = readdirSync(SKILLS_DIR)
  const skills = []
  for (const entry of entries) {
    const dir = join(SKILLS_DIR, entry)
    if (!statSync(dir).isDirectory()) continue
    const file = join(dir, 'SKILL.md')
    if (!existsSync(file)) continue
    const content = readFileSync(file, 'utf8')
    const meta = parseFrontmatter(content)
    const sha = createHash('sha256').update(content).digest('hex')
    const name = meta.name || entry
    if (OMIT_FROM_AGENT_SKILLS_INDEX.has(name)) continue
    skills.push({
      name,
      type: 'agent-skill',
      description: meta.description || '',
      url: `${SITE_URL}/.well-known/agent-skills/${encodeURIComponent(name)}/SKILL.md`,
      sha256: sha,
    })
  }
  skills.sort((a, b) => a.name.localeCompare(b.name))
  return skills
}

function existsSync(path) {
  try {
    statSync(path)
    return true
  } catch {
    return false
  }
}

function main() {
  const skills = discoverSkills()
  const index = {
    $schema:
      'https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema/index.schema.json',
    version: '0.2.0',
    site: SITE_URL,
    generatedAt: new Date().toISOString(),
    skills,
  }
  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(index, null, 2) + '\n', 'utf8')
  console.log(
    `[agent-skills] wrote ${skills.length} skill${skills.length === 1 ? '' : 's'} → ${OUT_FILE}`,
  )
}

main()
