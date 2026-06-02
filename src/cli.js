#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { generate } = require('./generator');
const { runBatch } = require('./batch');
const { describeThemes } = require('./themes');

const cli = yargs(hideBin(process.argv))
  .scriptName('og-gen')
  .usage('$0 [options]\n\nGenerate beautiful Open Graph / social media card images from the CLI')

  // Main options
  .option('title', {
    alias: 't',
    type: 'string',
    description: 'Main title text',
  })
  .option('subtitle', {
    alias: 's',
    type: 'string',
    description: 'Subtitle / description text',
  })
  .option('theme', {
    type: 'string',
    description: 'Built-in theme name',
    default: 'gradient-purple',
    choices: describeThemes().map(t => t.key),
  })
  .option('author', {
    alias: 'a',
    type: 'string',
    description: 'Author name displayed in footer',
  })
  .option('domain', {
    alias: 'd',
    type: 'string',
    description: 'Domain / URL shown in footer',
  })
  .option('logo', {
    type: 'string',
    description: 'Path or URL to a logo image (displayed in footer)',
  })
  .option('bg-image', {
    type: 'string',
    description: 'Path or URL to a background image',
  })
  .option('tags', {
    type: 'string',
    description: 'Comma-separated tags shown as pills',
  })
  .option('font-size', {
    type: 'number',
    description: 'Title font size in pixels (default: 56)',
  })
  .option('bg-color', {
    type: 'string',
    description: 'Custom background CSS (overrides theme)',
  })
  .option('text-color', {
    type: 'string',
    description: 'Custom text color (overrides theme)',
  })
  .option('accent-color', {
    type: 'string',
    description: 'Custom accent color (overrides theme)',
  })
  .option('template', {
    type: 'string',
    description: 'Path to a custom HTML template file',
  })
  .option('out', {
    alias: 'o',
    type: 'string',
    description: 'Output file path',
    default: 'og-output.png',
  })
  .option('batch', {
    alias: 'b',
    type: 'string',
    description: 'Path to a YAML/JSON batch config file',
  })
  .option('no-sandbox', {
    type: 'boolean',
    description: 'Disable Chromium sandbox (for CI/Docker)',
    default: false,
  })
  .option('list-themes', {
    type: 'boolean',
    description: 'List all available themes and exit',
    default: false,
  })

  .example('$0 --title "My Blog Post" --theme dark-minimal', 'Generate with dark theme')
  .example('$0 --title "Hello" --author "Dev" --domain "dev.to"', 'With author info')
  .example('$0 --batch config.yaml', 'Batch generate from config')
  .example('$0 --list-themes', 'Show available themes')

  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .wrap(90);

async function main() {
  const argv = cli.parse();

  // Handle --list-themes
  if (argv.listThemes) {
    console.log('\nAvailable themes:\n');
    for (const theme of describeThemes()) {
      console.log(`  ${theme.key.padEnd(18)} ${theme.description}`);
    }
    console.log('\nUsage: og-gen --title "..." --theme <theme-name>\n');
    process.exit(0);
  }

  // Handle batch mode
  if (argv.batch) {
    try {
      const results = await runBatch(argv.batch, { noSandbox: argv.noSandbox });
      console.log(`\nDone! Generated ${results.length} image(s).`);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  // Single image mode - require title
  if (!argv.title) {
    console.error('Error: --title is required (or use --batch for batch mode)\n');
    cli.showHelp();
    process.exit(1);
  }

  try {
    const options = {
      title: argv.title,
      subtitle: argv.subtitle,
      theme: argv.theme,
      author: argv.author,
      domain: argv.domain,
      logo: argv.logo,
      bgImage: argv.bgImage,
      tags: argv.tags,
      fontSize: argv.fontSize,
      bgColor: argv.bgColor,
      textColor: argv.textColor,
      accentColor: argv.accentColor,
      template: argv.template,
      out: argv.out,
      noSandbox: argv.noSandbox,
    };

    const outputPath = await generate(options);
    console.log(`Generated: ${outputPath}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
