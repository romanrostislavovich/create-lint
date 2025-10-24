import inquirer from "inquirer";
import { presets } from "./presets.js";
import { choosePackageManager } from "./packageManager.js";

export async function runPrompts() {
    const { usePreset } = await inquirer.prompt([
        {
            type: "confirm",
            name: "usePreset",
            message: "Use a preset configuration?",
            default: true
        }
    ]);

    if (usePreset) {
        const { presetName } = await inquirer.prompt([
            {
                type: "list",
                name: "presetName",
                message: "Choose a preset:",
                choices: Object.keys(presets)
            }
        ]);
        return presets[presetName];
    }

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "framework",
            message: "Choose framework:",
            choices: ["React", "Next.js", "Vue", "Svelte", "Angular", "Vanilla JS"]
        },
        {
            type: "checkbox",
            name: "tools",
            message: "Choose tools:",
            choices: ["TypeScript", "Prettier", "Stylelint", "Tailwind", "Husky + lint-staged", "EditorConfig", "Jest"]
        },
        {
            type: "confirm",
            name: "installDeps",
            message: "Install devDependencies automatically?",
            default: true
        }
    ]);

    const manager = await choosePackageManager();

    return { ...answers, manager };
}
