export const presets: Record<string, any> = {
    "Next.js + TypeScript + Tailwind": {
        framework: "Next.js",
        tools: ["TypeScript", "Prettier", "Tailwind", "Husky + lint-staged", "EditorConfig"],
        installDeps: true
    },
    "React + TypeScript + Prettier": {
        framework: "React",
        tools: ["TypeScript", "Prettier", "Husky + lint-staged", "EditorConfig"],
        installDeps: true
    },
    "Vue + Prettier + Stylelint": {
        framework: "Vue",
        tools: ["Prettier", "Stylelint", "Husky + lint-staged", "EditorConfig"],
        installDeps: true
    },
    "Svelte + Prettier": {
        framework: "Svelte",
        tools: ["Prettier", "EditorConfig"],
        installDeps: true
    },
    "Angular + TypeScript": {
        framework: "Angular",
        tools: ["TypeScript", "Prettier", "EditorConfig"],
        installDeps: false
    },
    "Vanilla JS + Prettier": {
        framework: "Vanilla JS",
        tools: ["Prettier", "EditorConfig"],
        installDeps: false
    }
};
