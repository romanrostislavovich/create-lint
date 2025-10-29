import { execa } from "execa";
import ora from "ora";
import { getPackageManagerCommands } from "./packageManager.js";
import {Tools} from "./enums/tools";
import {Frameworks} from "./enums/frameworks";

export async function installDependencies({ framework, tools, manager }: any) {
    const deps = ["eslint"];

    if (tools?.includes(Tools.TypeScript)) deps.push("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin");
    if (tools?.includes(Tools.Prettier)) deps.push("prettier", "eslint-config-prettier", "eslint-plugin-prettier", "stylelint-config-prettier");
    if (tools?.includes(Tools.Stylelint)) deps.push("stylelint", "stylelint-config-standard");
    if (tools?.includes(Tools.Tailwind)) deps.push("prettier-plugin-tailwindcss", "stylelint-config-tailwindcss", "stylelint-order");
    if (tools?.includes(Tools.Husky)) deps.push("husky", "lint-staged");
    if (tools?.includes(Tools.Jest)) deps.push("eslint-plugin-jest");

    if (framework === Frameworks.React || framework === Frameworks.NextJS) deps.push("eslint-plugin-react", "eslint-plugin-react-hooks");
    if (framework === Frameworks.Vue) deps.push("eslint-plugin-vue");
    if (framework === Frameworks.Svelte) deps.push("eslint-plugin-svelte");
    if (framework === Frameworks.Angular) {
      deps.push(
        "@angular-eslint/eslint-plugin",
        "@angular-eslint/eslint-plugin-template",
        "@angular-eslint/template-parser"
      );

      if (!deps.includes("@typescript-eslint/parser")) {
        deps.push("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin");
      }
    }

  const spinner = ora(`Installing devDependencies via ${manager}...`).start();

  const cmds = getPackageManagerCommands(manager);

  try {
    await execa(manager, [...cmds.installDev, ...deps], { stdio: "inherit" });
    spinner.succeed(`Dependencies successfully installed (${manager})`);
  } catch (err) {
    spinner.fail(`Failed to automatically install dependencies via ${manager}.`);
    console.log("Please install them manually:");
    if (manager === "npm") console.log(`npm i -D ${deps.join(" ")}`);
    else console.log(`${manager} add -D ${deps.join(" ")}`);
  }
}
