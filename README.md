# 🧩 create-linting

> 🚀 Instantly generate professional configs for ESLint, Prettier, Stylelint, Husky, EditorConfig,
> and lint-staged — for **any frontend stack** (React, Vue, Next.js, Svelte, Angular, Vanilla JS) in
> **under 30 seconds**.

[![npm version](https://img.shields.io/npm/v/create-linting.svg?style=flat&color=brightgreen)](https://www.npmjs.com/package/create-linting)
[![license](https://img.shields.io/npm/l/create-linting)](LICENSE)
![Node.js](https://img.shields.io/badge/Node-%3E=18-blue.svg)
![made with TypeScript](https://img.shields.io/badge/TypeScript-💙-blue)
![NPM Downloads](https://img.shields.io/npm/dm/create-linting)

---

## What is it? 🧠

`create-linting` is a CLI generator that:

- 🔧 **Creates all necessary linting configs** for your project in one go
- ⚙️ Supports **ESLint, Prettier, Stylelint, Husky + lint-staged, EditorConfig**
- 🧠 Comes with **ready-to-use presets** (React, Next.js, Vue, Svelte, Angular, Vanilla JS)
- 🛠️ Can **automatically install all dependencies**
- 💡 Works with **npm / yarn / pnpm** (your choice)
- ✨ Fully built with **TypeScript** — safe, reliable, and modern
- ⚙️ Can be added command to package.json file

---

## ⚡ Installation & Usage

```bash
# Run without installing globally
npx create-linting

# Or install globally
npm install -g create-linting
create-linting
```

The CLI will ask a few questions:

- 🧱 Which framework do you use (React, Next.js, Vue, Svelte, Angular, Vanilla)
- 🛠️ Which tools to include (TypeScript, Prettier, Stylelint, Tailwind, Husky, etc.)
- 📦 Which package manager to use (npm / yarn / pnpm)
- 📥 Whether to install dependencies automatically
- ⚙️ Whether to add commands to `package.json`

After that, it will generate config files like:

```files
eslint.config.json
prettier.config.mjs
stylelint.config.js
.editorconfig
lint-staged.config.js
...
```

and optionally install all required `devDependencies`.

---

## 🪄 Usage Examples

### 🚀 Quick Start for Next.js

```bash
npx create-linting
# → Select preset "Next.js + TypeScript + Tailwind"
# → Choose your package manager
# → Profit 💸
```

This will set up:

- ESLint with React and TypeScript support
- Prettier with Tailwind plugin
- Husky + lint-staged pre-commit hook
- EditorConfig for consistent indentation

### 🧱 For Vue or Svelte

```bash
npx create-linting
# → Select "Vue + Prettier + Stylelint"
```

It will automatically adjust configs for Vue (`eslint-plugin-vue`) or Svelte
(`eslint-plugin-svelte`).

---

## 🎯 Why Every Frontend Developer Needs This

| Problem                                    | `create-linting` Solution                   |
| ------------------------------------------ | ------------------------------------------- |
| “Setting up ESLint and Prettier is a pain” | 🪄 Everything ready in one command          |
| “TypeScript always breaks my ESLint setup” | ✅ Correct parsers and rules out of the box |
| “Too many linters and plugins to manage”   | ⚙️ One CLI — total control                  |
| “Team argues about code style”             | 💬 Unified, shared config                   |
| “Tired of setting up husky manually”       | 🧠 Auto-setup for hooks and lint-staged     |

---

## 💻 Supported Stacks & Tools

| Category          | Supported                                        |
| ----------------- |--------------------------------------------------|
| **Frameworks**    | React, Next.js, Vue, Svelte, Angular, Vanilla JS |
| **Languages**     | JavaScript, TypeScript                           |
| **Formatters**    | Prettier                                         |
| **CSS Linters**   | Stylelint (+ TailwindCSS)                        |
| **Git Hooks**     | Husky + lint-staged, CommitLint                  |
| **Editor Config** | EditorConfig                                     |
 | **Mardown linters** | MarkdownLint                                     |

---

## 🧰 Available Presets

| Preset                              | Includes                                            |
| ----------------------------------- | --------------------------------------------------- |
| **Next.js + TypeScript + Tailwind** | ESLint + Prettier + Tailwind + Husky + EditorConfig |
| **React + TypeScript + Prettier**   | ESLint + TS + Prettier + Husky + EditorConfig       |
| **Vue + Prettier + Stylelint**      | ESLint + Stylelint + Prettier + EditorConfig        |
| **Svelte + Prettier**               | ESLint + Prettier + EditorConfig                    |
| **Angular + TypeScript**            | ESLint + Prettier + EditorConfig                    |
| **Vanilla JS + Prettier**           | Lightweight base config without unnecessary noise   |

---

## 🧠 Architecture & Design

- 📁 Each linter has its own **builder** (`src/builder/*.ts`)
- 🧩 Templates are stored in `src/templates` and compiled via **EJS**
- ⚡ All tasks (generation, install, husky setup) are async and fast
- 🧱 Fully extensible — easily add new linters or presets
- 💬 Simple API for CI/CD integration

---

## 💡 Roadmap

- [ ] Add **Nuxt 3 + Tailwind** preset
- [ ] Generate `.lintingrc` with metadata

---

## 🧑‍💻 For Contributors

```bash
git clone https://github.com/yourname/create-linting.git
cd create-linting
npm install
npm run dev
```

Modify code in `src/`, build with `npm run build`, and test using:

```bash
npx ts-node-esm src/index.ts
```

---

## ⚙️ Requirements

- Node.js **>= 18**
- npm, yarn, or pnpm
- macOS / Linux / Windows

---

## 🩷 Authors & Support

Built with love for clean code and developer productivity  
by [Your Name / Nickname]  
📬 Contributions, PRs, and ideas are always welcome!

---

## 🧾 License

[MIT License](./LICENSE)

---

## ✨ TL;DR — Why You Should Try It Right Now

> 🧩 `create-linting` = 30 seconds → a project with perfectly configured ESLint, Prettier,
> Stylelint, Husky, and EditorConfig  
> No conflicts. No manual setup. Just ✨ “clean code out of the box.”
