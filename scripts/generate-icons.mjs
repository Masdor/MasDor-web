import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const PUBLIC = join(import.meta.dirname, '..', 'public')

const GOLD = '#CFA956'
const DARK = '#0b0f15'

function iconSvg(size) {
  const rx = Math.round(size * 0.1875)
  const borderWidth = Math.max(2, Math.round(size * 0.047))
  const fontSize = Math.round(size * 0.375)
  const textY = Math.round(size * 0.66)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${DARK}"/>
  <rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${size - borderWidth}" height="${size - borderWidth}" rx="${rx - 1}" fill="none" stroke="${GOLD}" stroke-width="${borderWidth}"/>
  <text x="${size / 2}" y="${textY}" text-anchor="middle" font-family="monospace" font-weight="700" font-size="${fontSize}" fill="${GOLD}">LR</text>
</svg>`
}

function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${DARK}"/>
  <rect x="2" y="2" width="1196" height="626" rx="0" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.15"/>

  <!-- Logo box -->
  <rect x="520" y="160" width="160" height="160" rx="28" fill="${DARK}" stroke="${GOLD}" stroke-width="4"/>
  <text x="600" y="260" text-anchor="middle" font-family="monospace" font-weight="700" font-size="72" fill="${GOLD}">LR</text>

  <!-- Title -->
  <text x="600" y="390" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="48" fill="#ffffff" letter-spacing="-1">LAB-ROOT</text>

  <!-- Subtitle -->
  <text x="600" y="435" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="400" font-size="22" fill="#8b949e">Engineering für Medical, Industrial &amp; IT</text>

  <!-- Bottom accent line -->
  <rect x="480" y="470" width="240" height="2" rx="1" fill="${GOLD}" opacity="0.4"/>

  <!-- Domain -->
  <text x="600" y="540" text-anchor="middle" font-family="monospace" font-weight="500" font-size="16" fill="${GOLD}" opacity="0.6">lab-root.com</text>
</svg>`
}

async function generate() {
  await mkdir(PUBLIC, { recursive: true })

  const sizes = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ]

  for (const { name, size } of sizes) {
    await sharp(Buffer.from(iconSvg(size)))
      .png()
      .toFile(join(PUBLIC, name))
    console.log(`Created ${name} (${size}x${size})`)
  }

  await sharp(Buffer.from(ogSvg()))
    .png()
    .toFile(join(PUBLIC, 'og-image.png'))
  console.log('Created og-image.png (1200x630)')
}

generate().catch(console.error)
