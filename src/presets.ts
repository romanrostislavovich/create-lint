import { Prompt } from './interfaces/prompt.js';
import { Frameworks } from './enums/frameworks.js';
import { Tools } from './enums/tools.js';

export const presets: Record<string, Prompt> = {
  'Next.js + TypeScript + Tailwind': {
    framework: Frameworks.NextJS,
    tools: [Tools.TypeScript, Tools.Prettier, Tools.Tailwind, Tools.Husky, Tools.EditorConfig],
    installDeps: true,
  },
  'React + TypeScript + Prettier': {
    framework: Frameworks.React,
    tools: [Tools.TypeScript, Tools.Prettier, Tools.Husky, Tools.EditorConfig],
    installDeps: true,
  },
  'Vue + Prettier + Stylelint': {
    framework: Frameworks.Vue,
    tools: [Tools.Prettier, Tools.Stylelint, Tools.Husky, Tools.EditorConfig],
    installDeps: true,
  },
  'Svelte + Prettier': {
    framework: Frameworks.Svelte,
    tools: [Tools.Prettier, Tools.EditorConfig],
    installDeps: true,
  },
  'Angular + TypeScript': {
    framework: Frameworks.Angular,
    tools: [Tools.TypeScript, Tools.Prettier, Tools.EditorConfig],
    installDeps: false,
  },
  'Vanilla JS + Prettier': {
    framework: Frameworks.VanillaJS,
    tools: [Tools.Prettier, Tools.EditorConfig],
    installDeps: false,
  },
};
