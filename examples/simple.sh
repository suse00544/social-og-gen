#!/bin/bash
# Simple examples of using social-og-gen

# Basic usage - just a title
npx social-og-gen --title "Hello, World!"

# With subtitle and theme
npx social-og-gen \
  --title "My Awesome Blog Post" \
  --subtitle "A deep dive into modern web development" \
  --theme gradient-blue \
  --out my-post-og.png

# Full featured
npx social-og-gen \
  --title "Building Better APIs" \
  --subtitle "REST, GraphQL, and what comes next" \
  --theme dark-minimal \
  --author "Alex Chen" \
  --domain "alexchen.dev" \
  --tags "api, architecture, backend" \
  --out api-post.png

# Custom colors (override theme)
npx social-og-gen \
  --title "Custom Branded Post" \
  --bg-color "linear-gradient(135deg, #1e3a5f 0%, #4a90d9 100%)" \
  --accent-color "#ffd700" \
  --out branded.png

# Batch mode
npx social-og-gen --batch examples/batch-config.yaml

# For CI/Docker environments
npx social-og-gen \
  --title "CI Generated" \
  --no-sandbox \
  --out ci-output.png
