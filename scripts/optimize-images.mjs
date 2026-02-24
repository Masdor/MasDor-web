#!/usr/bin/env node
/**
 * Image optimization script.
 * Re-compresses PNG assets in public/ using Sharp.
 * Optionally minifies favicon.svg whitespace.
 * Only overwrites files when the optimized version is smaller.
 */

import sharp from 'sharp'
import { readFileSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'

const PUBLIC = 'public'

const fmt = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function optimizePng(filename, options = {}) {
  const filepath = join(PUBLIC, filename)
  const originalSize = statSync(filepath).size

  const buffer = await sharp(filepath)
    .png({
      compressionLevel: 9,
      effort: 10,
      ...options,
    })
    .toBuffer()

  if (buffer.length < originalSize) {
    writeFileSync(filepath, buffer)
    const saved = originalSize - buffer.length
    const pct = ((saved / originalSize) * 100).toFixed(1)
    console.log(
      `  ${filename.padEnd(25)} ${fmt(originalSize).padStart(8)} -> ${fmt(buffer.length).padStart(8)}  (-${fmt(saved)}, -${pct}%)`
    )
    return saved
  } else {
    console.log(
      `  ${filename.padEnd(25)} ${fmt(originalSize).padStart(8)}    already optimal`
    )
    return 0
  }
}

function optimizeSvg(filename) {
  const filepath = join(PUBLIC, filename)
  const original = readFileSync(filepath, 'utf8')
  const originalSize = Buffer.byteLength(original, 'utf8')

  // Collapse whitespace: remove newlines, leading spaces, collapse runs
  const optimized = original
    .replace(/\n\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()

  const optimizedSize = Buffer.byteLength(optimized, 'utf8')
  const saved = originalSize - optimizedSize

  if (saved >= 20) {
    writeFileSync(filepath, optimized)
    const pct = ((saved / originalSize) * 100).toFixed(1)
    console.log(
      `  ${filename.padEnd(25)} ${fmt(originalSize).padStart(8)} -> ${fmt(optimizedSize).padStart(8)}  (-${fmt(saved)}, -${pct}%)`
    )
    return saved
  } else {
    console.log(
      `  ${filename.padEnd(25)} ${fmt(originalSize).padStart(8)}    savings < 20 B, skipped`
    )
    return 0
  }
}

async function main() {
  console.log('\n-- Image Optimization ---------------------\n')

  let totalSaved = 0

  console.log('PNG files:')
  totalSaved += await optimizePng('og-image.png', { palette: true, quality: 85 })
  totalSaved += await optimizePng('icon-512.png')
  totalSaved += await optimizePng('icon-192.png')
  totalSaved += await optimizePng('apple-touch-icon.png')

  console.log('\nSVG files:')
  totalSaved += optimizeSvg('favicon.svg')

  console.log(`\n  Total saved: ${fmt(totalSaved)}`)
  console.log('')
}

main().catch(console.error)
