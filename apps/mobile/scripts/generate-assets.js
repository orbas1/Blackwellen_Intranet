#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, '..', 'generated-assets');

const sizes = {
  icon: 1024,
  adaptiveIcon: 1024,
  splash: 2048
};

const palette = {
  primaryDark: '#0f172a',
  primaryMid: '#1e293b',
  accent: '#38bdf8',
  text: '#f8fafc'
};

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function buildIconSvg(size) {
  const padding = size * 0.14;
  const fontSize = size * 0.5;
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs>` +
    `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${palette.primaryDark}" />` +
    `<stop offset="100%" stop-color="${palette.primaryMid}" />` +
    `</linearGradient>` +
    `<linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.65"/>` +
    `<stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.15"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="100%" height="100%" rx="${padding}" fill="url(#bg)"/>` +
    `<path d="M ${padding} ${size - padding} L ${size - padding} ${padding}" stroke="url(#accent)" stroke-width="${size * 0.08}" stroke-linecap="round"/>` +
    `<text x="50%" y="52%" font-family="'Inter', 'SF Pro Display', 'Roboto', sans-serif" font-size="${fontSize}" font-weight="700" fill="${palette.text}" text-anchor="middle" dominant-baseline="middle">B</text>` +
    `</svg>`;
}

function buildSplashSvg(size) {
  const fontSize = size * 0.22;
  const ringRadius = size * 0.18;
  const center = size / 2;
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs>` +
    `<radialGradient id="splash-bg" cx="50%" cy="50%" r="75%">` +
    `<stop offset="0%" stop-color="${palette.primaryMid}" />` +
    `<stop offset="100%" stop-color="${palette.primaryDark}" />` +
    `</radialGradient>` +
    `<linearGradient id="splash-ring" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.8"/>` +
    `<stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.2"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="100%" height="100%" fill="url(#splash-bg)"/>` +
    `<circle cx="${center}" cy="${center}" r="${ringRadius}" fill="none" stroke="url(#splash-ring)" stroke-width="${size * 0.04}"/>` +
    `<text x="50%" y="52%" font-family="'Inter', 'SF Pro Display', 'Roboto', sans-serif" font-size="${fontSize}" font-weight="700" fill="${palette.text}" text-anchor="middle" dominant-baseline="middle">Blackwellen</text>` +
    `</svg>`;
}

async function generate() {
  ensureOutputDir();
  const tasks = [
    sharp(Buffer.from(buildIconSvg(sizes.icon)))
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(OUTPUT_DIR, 'icon.png')),
    sharp(Buffer.from(buildIconSvg(sizes.adaptiveIcon)))
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(OUTPUT_DIR, 'adaptive-icon.png')),
    sharp(Buffer.from(buildSplashSvg(sizes.splash)))
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(OUTPUT_DIR, 'splash.png'))
  ];

  await Promise.all(tasks);

  const metadata = {
    generatedAt: new Date().toISOString(),
    sizes,
    palette
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  // Ensure git ignores generated binaries but keeps metadata for traceability
  const gitignorePath = path.join(OUTPUT_DIR, '.gitignore');
  fs.writeFileSync(gitignorePath, '# Generated assets — do not commit\n*\n!.gitignore\n!metadata.json\n');
}

generate().catch((error) => {
  console.error('Failed to generate mobile branding assets', error);
  process.exit(1);
});
