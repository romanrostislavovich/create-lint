import inquirer from "inquirer";
import { presets } from "./presets.js";
import { choosePackageManager } from "./packageManager.js";
import {Frameworks} from "./enums/frameworks";
import {Tools} from "./enums/tools";

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

    const frameworks = [
      Frameworks.React,
      Frameworks.NextJS,
      Frameworks.Vue,
      Frameworks.Svelte,
      Frameworks.Angular,
      Frameworks.VanillaJS
    ]

    const tools = [
      Tools.TypeScript,
      Tools.Prettier,
      Tools.Stylelint,
      Tools.Tailwind,
      Tools.Husky,
      Tools.EditorConfig,
      Tools.Jest
    ]

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "framework",
            message: "Choose framework:",
            choices: frameworks
        },
        {
            type: "checkbox",
            name: "tools",
            message: "Choose tools:",
            choices: tools
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
