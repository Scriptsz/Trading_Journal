#!/usr/bin/env node
/**
 * Checks whether node_modules is populated and runs `npm install` if not.
 * Called automatically by the `predev` and `prebuild` npm lifecycle hooks so
 * that `npm run dev` / `npm run build` are self-healing after a fresh clone
 * or any environment reset that clears node_modules.
 */

const { execSync } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

const marker = path.join(__dirname, '..', 'node_modules', 'next')

if (!existsSync(marker)) {
  console.log('⚠️  node_modules is missing — running npm install...')
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log('✅  Dependencies installed successfully.')
  } catch (err) {
    console.error('❌  npm install failed:', err.message)
    process.exit(1)
  }
}
