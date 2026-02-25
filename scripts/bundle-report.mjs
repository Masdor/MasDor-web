/**
 * Post-build bundle size report.
 * Reads dist/assets/ and prints a table of chunk sizes.
 * Exits with code 1 if total JS exceeds the budget (default 250 KB gzipped estimate).
 */

import { readdirSync, statSync, appendFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist/assets'
// React 19 + react-dom (~140 KB) + i18next (~20 KB) + app code sets the baseline.
// Locale JSONs are lazy-loaded at runtime from /locales/, not bundled as JS.
const JS_BUDGET_KB = 315

try {
  const files = readdirSync(DIST)
  const entries = files
    .map((name) => {
      const size = statSync(join(DIST, name)).size
      return { name, size }
    })
    .sort((a, b) => b.size - a.size)

  const jsFiles = entries.filter((e) => e.name.endsWith('.js'))
  const cssFiles = entries.filter((e) => e.name.endsWith('.css'))

  const fmt = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  console.log('\n── Bundle Report ─────────────────────────')
  console.log('\nJS chunks:')
  let totalJs = 0
  for (const f of jsFiles) {
    totalJs += f.size
    console.log(`  ${f.name.padEnd(40)} ${fmt(f.size).padStart(10)}`)
  }
  console.log(`  ${'TOTAL JS'.padEnd(40)} ${fmt(totalJs).padStart(10)}`)

  console.log('\nCSS chunks:')
  let totalCss = 0
  for (const f of cssFiles) {
    totalCss += f.size
    console.log(`  ${f.name.padEnd(40)} ${fmt(f.size).padStart(10)}`)
  }
  console.log(`  ${'TOTAL CSS'.padEnd(40)} ${fmt(totalCss).padStart(10)}`)

  console.log(`\n  ${'TOTAL'.padEnd(40)} ${fmt(totalJs + totalCss).padStart(10)}`)

  const budgetBytes = JS_BUDGET_KB * 1024
  if (totalJs > budgetBytes) {
    console.log(`\n⚠ JS budget exceeded: ${fmt(totalJs)} > ${JS_BUDGET_KB} KB`)
    process.exit(1)
  } else {
    console.log(`\n✓ JS within budget (${fmt(totalJs)} / ${JS_BUDGET_KB} KB)`)
  }

  // GitHub Actions Job Summary
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = [
      '## Bundle Report',
      '',
      '| File | Size |',
      '|------|------|',
      ...jsFiles.map((f) => `| \`${f.name}\` | ${fmt(f.size)} |`),
      ...cssFiles.map((f) => `| \`${f.name}\` | ${fmt(f.size)} |`),
      '',
      `**Total JS:** ${fmt(totalJs)} / ${JS_BUDGET_KB} KB budget`,
      `**Total CSS:** ${fmt(totalCss)}`,
      `**Total:** ${fmt(totalJs + totalCss)}`,
    ].join('\n')
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary)
  }

  console.log('')
} catch {
  console.error('Could not read dist/assets/. Run `npm run build` first.')
  process.exit(1)
}
