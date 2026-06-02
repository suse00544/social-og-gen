# social-og-gen

[![npm version](https://img.shields.io/npm/v/social-og-gen.svg)](https://www.npmjs.com/package/social-og-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js >= 18](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

**Generate beautiful Open Graph / social media card images from the command line.**

No SaaS subscriptions. No watermarks. No browser extensions. Just a fast CLI that turns your text into pixel-perfect 1200x630 PNG cards ready for Twitter, Facebook, LinkedIn, Discord, and Slack.

---

## Why?

Making OG images is tedious:

- **Designer tools** (Figma, Canva) require manual work for every post
- **SaaS generators** cost money, add watermarks, or lock you into their platform
- **Programmatic approaches** with Cairo/Pillow produce ugly text rendering

Developers deserve a **free, open-source CLI tool** that generates beautiful cards with proper typography, modern CSS, and zero friction. `social-og-gen` renders real HTML/CSS via headless Chromium, so your cards look as good as hand-designed ones.

---

## Quick Start

Generate your first OG image in one command:

```bash
npx social-og-gen --title "Hello World"
```

This creates `og-output.png` in your current directory -- a 1200x630 card with the default purple gradient theme.

### Install globally

```bash
npm install -g social-og-gen

# Now use it anywhere
og-gen --title "My Post" --theme dark-minimal --out card.png
```

---

## Themes

Seven built-in themes, each carefully designed for readability and visual impact:

| Theme | Description |
|-------|-------------|
| `gradient-purple` | Rich purple-to-pink gradient with white text (default) |
| `gradient-blue` | Cool blue-to-cyan gradient, modern feel |
| `dark-minimal` | Clean dark background with sharp white text |
| `light-clean` | Bright white background with dark text, minimal style |
| `sunset` | Warm orange-to-red gradient evoking golden hour |
| `ocean` | Deep sea blue-to-teal, calm and professional |
| `forest` | Natural green-to-emerald gradient, earthy tones |

List all themes:

```bash
og-gen --list-themes
```

---

## CLI Reference

```
og-gen [options]

Options:
  --title, -t        Main title text                              [string] [required]
  --subtitle, -s     Subtitle / description text                  [string]
  --theme            Built-in theme name                          [string] [default: "gradient-purple"]
  --author, -a       Author name displayed in footer              [string]
  --domain, -d       Domain / URL shown in footer                 [string]
  --logo             Path or URL to a logo image                  [string]
  --bg-image         Path or URL to a background image            [string]
  --tags             Comma-separated tags shown as pills          [string]
  --font-size        Title font size in pixels (default: 56)      [number]
  --bg-color         Custom background CSS (overrides theme)      [string]
  --text-color       Custom text color (overrides theme)          [string]
  --accent-color     Custom accent color (overrides theme)        [string]
  --template         Path to a custom HTML template file          [string]
  --out, -o          Output file path                             [string] [default: "og-output.png"]
  --batch, -b        Path to a YAML/JSON batch config file        [string]
  --no-sandbox       Disable Chromium sandbox (for CI/Docker)     [boolean] [default: false]
  --list-themes      List all available themes and exit           [boolean]
  --help, -h         Show help                                    [boolean]
  --version, -v      Show version                                 [boolean]
```

### Examples

```bash
# Minimal
og-gen --title "My Blog Post"

# Full featured
og-gen \
  --title "Building Better APIs" \
  --subtitle "REST, GraphQL, and what comes next" \
  --theme dark-minimal \
  --author "Alex Chen" \
  --domain "alexchen.dev" \
  --tags "api, architecture, backend" \
  --out api-post.png

# Custom brand colors
og-gen \
  --title "Company Update" \
  --bg-color "linear-gradient(135deg, #1e3a5f 0%, #4a90d9 100%)" \
  --accent-color "#ffd700" \
  --out branded.png

# With background image
og-gen \
  --title "Travel Photography Tips" \
  --bg-image ./hero.jpg \
  --out travel-og.png

# For CI/Docker (no sandbox)
og-gen --title "Auto Generated" --no-sandbox --out ci.png
```

---

## Batch Mode

Generate multiple images at once from a YAML or JSON config file:

```bash
og-gen --batch config.yaml
```

### Config format

```yaml
# config.yaml
defaults:
  theme: gradient-purple
  author: "Jane Developer"
  domain: "janedeveloper.com"

images:
  - title: "Getting Started with Rust"
    subtitle: "A practical guide for JS developers"
    tags: "rust, programming"
    theme: gradient-blue
    out: "output/rust-post.png"

  - title: "Why I Love Open Source"
    subtitle: "Contributing changed my career"
    theme: forest
    out: "output/open-source.png"
```

- `defaults` are applied to every image unless overridden
- Each entry in `images` can override any default
- If `out` is omitted, files are named `og-output-1.png`, `og-output-2.png`, etc.

JSON configs work the same way -- just use `.json` extension.

---

## Template Customization

The default template produces beautiful cards out of the box, but you can supply your own:

```bash
og-gen --title "Custom" --template ./my-template.html --out custom.png
```

### Template variables

Your HTML template can use these mustache-style placeholders:

| Variable | Description |
|----------|-------------|
| `{{title}}` | Main title text |
| `{{subtitle}}` | Subtitle text |
| `{{author}}` | Author name |
| `{{domain}}` | Domain string |
| `{{logo}}` | Logo image URL |
| `{{tags}}` | Pre-rendered tag HTML |
| `{{customStyles}}` | CSS custom properties from theme + overrides |
| `{{bgImageStyle}}` | Background image inline style |
| `{{bgImageClass}}` | CSS class when bg image is present |

### Conditional blocks

```html
{{#subtitle}}<p class="subtitle">{{subtitle}}</p>{{/subtitle}}
{{#author}}<span class="author">{{author}}</span>{{/author}}
```

Content inside `{{#var}}...{{/var}}` only renders if the variable is non-empty.

### CSS custom properties

Themes inject these properties which your template CSS can consume:

```css
--bg              /* Background gradient/color */
--text-color      /* Primary text color */
--subtitle-color  /* Subtitle text color */
--meta-color      /* Meta/secondary text color */
--accent-color    /* Accent/highlight color */
--card-bg         /* Card background (semi-transparent) */
--card-border     /* Card border color */
```

---

## Programmatic Usage

Use as a Node.js library:

```javascript
const { generate } = require('social-og-gen/src/generator');

await generate({
  title: 'My Post Title',
  subtitle: 'A great subtitle',
  theme: 'ocean',
  author: 'Dev',
  out: './card.png',
});
```

---

## CI / Docker

In environments without a display server, use `--no-sandbox`:

```bash
og-gen --title "CI Build" --no-sandbox --out og.png
```

For Docker, ensure Playwright dependencies are installed:

```dockerfile
FROM node:20
RUN npx playwright install --with-deps chromium
RUN npm install -g social-og-gen
CMD ["og-gen", "--title", "Docker Build", "--no-sandbox", "--out", "/output/og.png"]
```

---

## GitHub Actions

```yaml
- name: Generate OG images
  run: |
    npx playwright install --with-deps chromium
    npx social-og-gen \
      --title "${{ github.event.pull_request.title }}" \
      --subtitle "PR #${{ github.event.pull_request.number }}" \
      --theme dark-minimal \
      --no-sandbox \
      --out og-image.png
```

---

## Roadmap

- [ ] SVG output format
- [ ] Animated OG images (APNG/GIF)
- [ ] Remote font loading (Google Fonts)
- [ ] Theme builder CLI (`og-gen theme create`)
- [ ] Template gallery with community submissions
- [ ] AVIF/WebP output formats
- [ ] Built-in dev server with live preview
- [ ] Plugin system for custom renderers

---

## Contributing

Contributions are welcome! Here's how to get started:

```bash
git clone https://github.com/user/social-og-gen.git
cd social-og-gen
npm install
npx playwright install chromium

# Test a generation
node src/cli.js --title "Dev Test" --out test.png
```

### Project structure

```
src/
  cli.js          # CLI entry point (yargs)
  generator.js    # Core rendering logic
  themes.js       # Theme definitions
  batch.js        # Batch generation from config
  templates/
    default.html  # Default OG card template
examples/
  batch-config.yaml
  simple.sh
```

### Adding a theme

1. Add your theme object to `src/themes.js`
2. Test it: `node src/cli.js --title "Test" --theme your-theme --out test.png`
3. Submit a PR!

---

## License

MIT
