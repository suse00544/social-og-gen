'use strict';

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { generate } = require('./generator');

/**
 * Parse a batch config file (YAML or JSON).
 * Expected format:
 * {
 *   defaults: { theme: '...', author: '...', ... },
 *   images: [
 *     { title: '...', subtitle: '...', out: '...', ... },
 *     ...
 *   ]
 * }
 */
function parseConfig(filePath) {
  const absPath = path.resolve(filePath);
  const content = fs.readFileSync(absPath, 'utf-8');
  const ext = path.extname(absPath).toLowerCase();

  if (ext === '.yaml' || ext === '.yml') {
    return YAML.parse(content);
  } else if (ext === '.json') {
    return JSON.parse(content);
  } else {
    // Try YAML first, fall back to JSON
    try {
      return YAML.parse(content);
    } catch {
      return JSON.parse(content);
    }
  }
}

/**
 * Run batch generation from a config file.
 *
 * @param {string} configPath - Path to YAML/JSON config
 * @param {object} [cliOptions] - CLI-level overrides (e.g. --no-sandbox)
 * @returns {Promise<string[]>} Array of generated file paths
 */
async function runBatch(configPath, cliOptions = {}) {
  const config = parseConfig(configPath);
  const defaults = config.defaults || {};
  const images = config.images || [];

  if (!images.length) {
    throw new Error('Batch config has no images defined');
  }

  const results = [];

  for (let i = 0; i < images.length; i++) {
    const imageOpts = images[i];
    const merged = {
      ...defaults,
      ...imageOpts,
      // CLI-level flags always win
      ...(cliOptions.noSandbox !== undefined && { noSandbox: cliOptions.noSandbox }),
    };

    // Default output name if not specified
    if (!merged.out) {
      merged.out = `og-output-${i + 1}.png`;
    }

    console.log(`[${i + 1}/${images.length}] Generating: ${merged.title}`);
    const outputPath = await generate(merged);
    results.push(outputPath);
    console.log(`  -> ${outputPath}`);
  }

  return results;
}

module.exports = { runBatch, parseConfig };
