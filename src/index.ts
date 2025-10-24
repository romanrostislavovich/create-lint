import chalk from "chalk";
import ora from "ora";
import { runPrompts } from "./prompts.js";
import { generateConfigs } from "./generator.js";

(async function main() {
  console.log(chalk.cyanBright("\n🧩 create-linting — Linting config generator\n"));

  const answers = await runPrompts();

  const spinner = ora("Generating configs...").start();

  try {
    await generateConfigs(answers);
    spinner.succeed("Done — configs have been created ✅");
    console.log(chalk.green("Check the generated files in the current directory."));
  } catch (err) {
    spinner.fail("Error during config generation");
    console.error(err);
    process.exit(1);
  }
})();
