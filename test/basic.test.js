'use strict';

const assert = require('assert');
const path = require('path');
const { getTheme, listThemes, describeThemes } = require('../src/themes');
const { renderTemplate, buildCustomStyles, buildTagsHtml } = require('../src/generator');

// Theme tests
console.log('Testing themes...');

assert(listThemes().length === 7, 'Should have 7 built-in themes');
assert(listThemes().includes('gradient-purple'), 'Should include gradient-purple');
assert(listThemes().includes('dark-minimal'), 'Should include dark-minimal');

const purple = getTheme('gradient-purple');
assert(purple, 'gradient-purple theme should exist');
assert(purple.vars['--bg'], 'Theme should have --bg variable');
assert(purple.vars['--text-color'], 'Theme should have --text-color variable');

assert(!getTheme('nonexistent'), 'Nonexistent theme should return undefined');

const descriptions = describeThemes();
assert(descriptions.length === 7, 'describeThemes should return 7 entries');
assert(descriptions[0].key, 'Each description should have a key');
assert(descriptions[0].description, 'Each description should have a description');

console.log('  Themes: PASS');

// Template rendering tests
console.log('Testing template rendering...');

const simple = renderTemplate('Hello {{name}}!', { name: 'World' });
assert(simple === 'Hello World!', 'Simple replacement should work');

const conditional = renderTemplate('{{#show}}visible{{/show}}', { show: 'yes' });
assert(conditional === 'visible', 'Conditional with truthy value should render');

const conditionalFalse = renderTemplate('{{#show}}visible{{/show}}', { show: '' });
assert(conditionalFalse === '', 'Conditional with empty value should not render');

const nested = renderTemplate('{{#author}}<b>{{author}}</b>{{/author}}', { author: 'Alice' });
assert(nested === '<b>Alice</b>', 'Nested variable in conditional should work');

console.log('  Template rendering: PASS');

// Custom styles tests
console.log('Testing custom styles...');

const styles = buildCustomStyles({ theme: 'gradient-purple' });
assert(styles.includes('--bg'), 'Should include theme vars');
assert(styles.includes('--text-color'), 'Should include text color');

const withOverrides = buildCustomStyles({ theme: 'dark-minimal', fontSize: 72 });
assert(withOverrides.includes('--font-size-title: 72px'), 'Should include font size override');

console.log('  Custom styles: PASS');

// Tags HTML tests
console.log('Testing tags HTML...');

const tags = buildTagsHtml('rust, nodejs, open-source');
assert(tags.includes('rust'), 'Should include first tag');
assert(tags.includes('nodejs'), 'Should include second tag');
assert(tags.includes('class="tag"'), 'Should have tag class');
assert(tags.split('span').length - 1 === 6, 'Should have 3 tag elements (6 span occurrences)');

const emptyTags = buildTagsHtml('');
assert(emptyTags === '', 'Empty string should return empty');

const nullTags = buildTagsHtml(null);
assert(nullTags === '', 'Null should return empty');

console.log('  Tags HTML: PASS');

console.log('\nAll tests passed!');
