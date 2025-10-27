import { execa } from "execa";
import ora from "ora";
import { getPackageManagerCommands } from "./packageManager.js";

export async function installDependencies({ framework, tools, manager }: any) {
    const deps = ["eslint"];

    if (tools?.includes("TypeScript")) deps.push("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin");
    if (tools?.includes("Prettier")) deps.push("prettier", "eslint-config-prettier", "eslint-plugin-prettier");
    if (tools?.includes("Stylelint")) deps.push("stylelint", "stylelint-config-standard");
    if (tools?.includes("Tailwind")) deps.push("prettier-plugin-tailwindcss", "stylelint-config-tailwindcss");
    if (tools?.includes("Husky + lint-staged")) deps.push("husky", "lint-staged");
    if (tools?.includes("Jest")) deps.push("eslint-plugin-jest");

    if (framework === "React" || framework === "Next.js") deps.push("eslint-plugin-react", "eslint-plugin-react-hooks");
    if (framework === "Vue") deps.push("eslint-plugin-vue");
    if (framework === "Svelte") deps.push("eslint-plugin-svelte");
    if (framework === "Angular") {
      deps.push("@angular-eslint/eslint-plugin", "@angular-eslint/eslint-plugin-template", "@angular-eslint/template-parser");
      if (!deps.includes("@typescript-eslint/parser")) {
        deps.push("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin");
      }
      deps.push("@angular-eslint/schematics")
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
