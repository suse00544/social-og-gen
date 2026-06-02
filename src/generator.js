'use strict';

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { getTheme, listThemes } = require('./themes');

const DEFAULT_TEMPLATE = path.join(__dirname, 'templates', 'default.html');
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

/**
 * Simple mustache-like template rendering.
 * Supports {{var}}, {{#var}}...{{/var}} conditional blocks.
 */
function renderTemplate(html, data) {
  // Handle conditional blocks: {{#key}}content{{/key}}
  html = html.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, key, content) => {
    if (data[key]) {
      return content.replace(/\{\{(\w+)\}\}/g, (__, k) => data[k] || '');
    }
    return '';
  });

  // Handle simple replacements: {{key}}
  html = html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return data[key] !== undefined ? data[key] : '';
  });

  return html;
}

/**
 * Build CSS custom property overrides from theme + user options.
 */
function buildCustomStyles(options) {
  const styles = [];
  const theme = getTheme(options.theme || 'gradient-purple');

  if (theme) {
    for (const [prop, value] of Object.entries(theme.vars)) {
      styles.push(`${prop}: ${value}`);
    }
  }

  // User overrides
  if (options.fontSize) {
    styles.push(`--font-size-title: ${options.fontSize}px`);
  }
  if (options.bgColor) {
    styles.push(`--bg: ${options.bgColor}`);
  }
  if (options.textColor) {
    styles.push(`--text-color: ${options.textColor}`);
  }
  if (options.accentColor) {
    styles.push(`--accent-color: ${options.accentColor}`);
  }

  return styles.length > 0 ? styles.join('; ') + ';' : '';
}

/**
 * Build tag HTML from a comma-separated string.
 */
function buildTagsHtml(tagsStr) {
  if (!tagsStr) return '';
  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
  return tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
}

/**
 * Escape HTML special characters.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate an OG image from options.
 *
 * @param {object} options
 * @param {string} options.title - Main title text (required)
 * @param {string} [options.subtitle] - Subtitle text
 * @param {string} [options.theme] - Theme name
 * @param {string} [options.author] - Author name
 * @param {string} [options.domain] - Domain/URL text
 * @param {string} [options.logo] - Path or URL to logo image
 * @param {string} [options.bgImage] - Path or URL to background image
 * @param {string} [options.tags] - Comma-separated tags
 * @param {number} [options.fontSize] - Title font size in px
 * @param {string} [options.bgColor] - Background CSS (overrides theme)
 * @param {string} [options.textColor] - Text color (overrides theme)
 * @param {string} [options.accentColor] - Accent color (overrides theme)
 * @param {string} [options.template] - Path to custom HTML template
 * @param {string} [options.out] - Output file path
 * @param {boolean} [options.noSandbox] - Disable Chromium sandbox
 * @returns {Promise<string>} Path to the generated image
 */
async function generate(options) {
  if (!options.title) {
    throw new Error('Title is required. Use --title "Your Title"');
  }

  const templatePath = options.template || DEFAULT_TEMPLATE;
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Resolve logo path to absolute file:// URL if it's a local file
  let logoSrc = options.logo || '';
  if (logoSrc && !logoSrc.startsWith('http') && !logoSrc.startsWith('data:')) {
    const absPath = path.resolve(logoSrc);
    if (fs.existsSync(absPath)) {
      logoSrc = `file://${absPath}`;
    }
  }

  // Resolve background image
  let bgImageStyle = '';
  let bgImageClass = '';
  if (options.bgImage) {
    let bgSrc = options.bgImage;
    if (!bgSrc.startsWith('http') && !bgSrc.startsWith('data:')) {
      const absPath = path.resolve(bgSrc);
      if (fs.existsSync(absPath)) {
        bgSrc = `file://${absPath}`;
      }
    }
    bgImageStyle = `background-image: url('${bgSrc}');`;
    bgImageClass = 'has-bg-image';
  }

  const customStyles = buildCustomStyles(options);
  const tagsHtml = buildTagsHtml(options.tags);

  const data = {
    title: escapeHtml(options.title),
    subtitle: options.subtitle ? escapeHtml(options.subtitle) : '',
    author: options.author ? escapeHtml(options.author) : '',
    domain: options.domain ? escapeHtml(options.domain) : '',
    logo: logoSrc,
    tags: tagsHtml,
    customStyles,
    bgImageStyle,
    bgImageClass,
  };

  html = renderTemplate(html, data);

  // Launch browser and screenshot
  const launchOptions = {
    headless: true,
  };

  if (options.noSandbox) {
    launchOptions.args = ['--no-sandbox', '--disable-setuid-sandbox'];
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({
    viewport: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  });

  await page.setContent(html, { waitUntil: 'networkidle' });

  const outputPath = path.resolve(options.out || 'og-output.png');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: { x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
  });

  await browser.close();

  return outputPath;
}

module.exports = { generate, renderTemplate, buildCustomStyles, buildTagsHtml };
