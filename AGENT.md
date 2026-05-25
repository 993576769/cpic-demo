# AGENT.md

## Project Overview

This is a Vue 3 + TypeScript + uni-app mini-program project built with Vite and pnpm.

- Package manager: `pnpm`
- Node requirement: `>= 18.15.0`
- Main target: WeChat mini-program via `mp-weixin`
- State management: Pinia
- Styling: SCSS, with global style modules injected from `vite.config.ts`
- Linting: ESLint flat config based on `@antfu/eslint-config`

## Common Commands

- Install dependencies: `pnpm install`
- Start development: `pnpm start`
- Start WeChat mini-program dev build: `pnpm dev:mp-weixin`
- Run all checks: `pnpm test`
- Lint JavaScript/Vue/TypeScript files: `pnpm lint:js`
- Type-check Vue and TypeScript: `pnpm lint:ts`
- Build staging mini-program: `pnpm build:staging:mp-weixin`
- Build production mini-program: `pnpm build:production:mp-weixin`

## Repository Structure

- `src/pages.json`: uni-app page and tab configuration
- `src/main.ts`: Vue app entry
- `src/App.vue`: app-level lifecycle and global style entry
- `src/pages/`: page-level views
- `src/components/common/`: shared base components
- `src/stores/`: Pinia stores
- `src/hooks/`: reusable page/store business logic
- `src/utils/`: general utilities
- `src/styles/`: shared colors, CSS variables, mixins, and global styles
- `src/static/`: static assets used by the app
- `script/`: deployment scripts
- `loader/`: custom build/postcss tooling

## Coding Guidelines

- Prefer Vue 3 Composition API with `<script setup lang="ts">`.
- Follow the existing component and store patterns before adding new abstractions.
- Keep page-specific logic in `src/pages/` and reusable business logic in `src/hooks/`.
- Use Pinia stores for shared application state.
- Use existing utilities from `src/utils/` before creating new helpers.
- Keep styles in SCSS and reuse the globally injected color, variable, and mixin files.
- Avoid adding new UI/icon dependencies unless the project explicitly needs them.
- Preserve uni-app compatibility when using browser, DOM, or platform-specific APIs.

## Style And Lint Notes

- The project uses semicolons.
- Curly braces are required for control flow.
- Vue component self-closing rules are enforced by ESLint.
- Production lint treats `console` usage as an error.
- Do not edit generated, dependency, or build output files.

## Figma Workflow

When implementing from Figma:

1. Use the Figma MCP tools when available.
2. Fetch structured node data before implementation.
3. Fetch or render a screenshot for visual comparison.
4. Download required image/SVG assets through Figma tooling.
5. Translate Figma output into this project's Vue, uni-app, and SCSS conventions.
6. Reuse project styles and components where possible.
7. Validate the result visually against the Figma reference.

Known Figma file currently used in this workspace:

- `保险行业销售助手`
- File key: `gZAcOeX3Erf33KDnenRCPW`
- Home frame node: `141:5623`

## Verification

Before considering code changes complete, run the smallest relevant check:

- Documentation-only change: no build is usually required.
- Vue/TypeScript logic change: `pnpm lint:ts`
- Styling or component change: `pnpm lint:js` and a visual check when possible.
- Broad change: `pnpm test`

Mention any checks that could not be run and why.

## Git Hygiene

- The working tree may contain user changes. Do not revert or overwrite unrelated files.
- Keep changes scoped to the task.
- Check `git status --short` before and after edits.
- Do not commit, stage, or push unless explicitly asked.
