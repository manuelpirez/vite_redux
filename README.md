# Vite ⚡

> Next Generation Frontend Tooling

- 💡 Instant Server Start
- ⚡️ Lightning Fast HMR
- 🛠️ Rich Features
- 📦 Optimized Build
- 🔩 Universal Plugin Interface
- 🔑 Fully Typed APIs

Vite (French word for "quick", pronounced [`/vit/`](https://cdn.jsdelivr.net/gh/vitejs/vite@main/docs/public/vite.mp3), like "veet") is a new breed of frontend build tooling that significantly improves the frontend development experience. It consists of two major parts:

- A dev server that serves your source files over [native ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), with [rich built-in features](https://vitejs.dev/guide/features.html) and astonishingly fast [Hot Module Replacement (HMR)](https://vitejs.dev/guide/features.html#hot-module-replacement).

- A [build command](https://vitejs.dev/guide/build.html) that bundles your code with [Rollup](https://rollupjs.org), pre-configured to output highly optimized static assets for production.

In addition, Vite is highly extensible via its [Plugin API](https://vitejs.dev/guide/api-plugin.html) and [JavaScript API](https://vitejs.dev/guide/api-javascript.html) with full typing support.

[Read the Docs to Learn More](https://vitejs.dev).

# Dev set-up

Environment 📦`Node >=v18.0`

- Install dependencies
  - `npm install`
- Start mock server
  - `npm run start:server`
- Start dev server
  - `npm run dev`

# Workflow

- Stage commits
  - `git add .`
- Commit changes
  - `npm run commit`

# Structure
- src/
- ├─ Index.jsx ➡️ Define providers and stores
- ├─ App.jsx ➡️ Router & Auth 
- ├─ components/
- │  ├─ controllers ➡️ Router Facing React components
- │  ├─ ui ➡️ Generic UI React Components
- ├─ features ➡️ Redux API & State managers
- ├─ hooks ➡️ Generic hooks and Redux interfaces
- ├─ static ➡️ JSON configuration files
- ├─ style ➡️ MUI Themes
- ├─ utils ➡️ Generic functions & utilities



### Manifest

- [See this link for new component workflow](https://docs.google.com/document/d/1AWmog74wuFqTLcnNADRQRjAQ9htW8QyskCMawFL7-mM/edit)
- Commits
  - [Conventional commits convention](https://www.conventionalcommits.org/en/v1.0.0/) should be followed
  - [commitizen with cz-git and changelog](https://cz-git.qbb.sh/cli/install)
    - [Open ai setup is available ](https://cz-git.qbb.sh/recipes/openai)
  - linter & formatter
    - eslint config -> .eslintrc.cjs
      - lint staged -> .lintstagedrc.json
    - prettier config -> .prettierrc.json
  - husky pre-commit config available
    - pre-commit
    - pre-commit-msg

# Release

- https://github.com/googleapis/release-please
- https://github.com/googleapis/release-please/blob/main/docs/cli.md
- https://semver.org

# Testing

- Run tests
  - `npm run test`
- Open interactive test UI
  - `npm run test:ui`
- Disable silent mode in `vitest.config.js`

```
  test: {
    ...
    silent: true <- remove
  }
```

### Manifest

- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) + [vitest](https://vitest.dev/)
- [msw for api mock](https://mswjs.io/)
- [jsdom](https://github.com/jsdom/jsdom)

# Config file

- brand: "ntk" | "dg"
- storageOptions
  - type: "local" | "cookies"
  - domain: domain to save when using cookies
- tracking
  - enabled: turn on/off piwik tracking

# Static Files

- urlParams.json
  - persist
    - variables that will be stored in cookies
    - should be all lower caps
  - noPersist
    - volvatile variables that will be stored on redux state

# Changes

- React v16 -> v18
- react-router v5 -> v6
- Compiler cra -> Vite
- Redux
  - react-redux 7.x.x -> 9.1.x
  - toolkit 1.8.x -> 2.1.x
  - redux-saga -> no more
- awilix -> no more
- jest -> vitest https://vitest.dev/
- i18next 20.x.x -> 23.10.x

# todo

- sign out to delete params
- changing themes
- translation update
- params CRUD
- tracking
