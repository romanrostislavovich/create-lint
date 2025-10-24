import { execa } from "execa";
import inquirer from "inquirer";


async function isInstalled(cmd: string): Promise<boolean> {
    try {
        await execa(cmd, ["--version"]);
        return true;
    } catch {
        return false;
    }
}


export async function detectAvailablePackageManagers(): Promise<string[]> {
    const managers = ["npm", "yarn", "pnpm"];
    const available: string[] = [];

    for (const m of managers) {
        if (await isInstalled(m)) available.push(m);
    }

    return available.length ? available : ["npm"];
}


export async function choosePackageManager(): Promise<string> {
  const available = await detectAvailablePackageManagers();

  if (available.length === 1) {
    console.log(`✅ Using ${available[0]} (the only detected package manager)\n`);
    return available[0];
  }

  const { manager } = await inquirer.prompt([
    {
      type: "list",
      name: "manager",
      message: "Select a package manager:",
      choices: available
    }
  ]);

  return manager;
}


export function getPackageManagerCommands(manager: string) {
    switch (manager) {
        case "yarn":
            return {
                installDev: ["add", "-D"],
                run: ["run"],
                exec: ["exec"]
            };
        case "pnpm":
            return {
                installDev: ["add", "-D"],
                run: ["run"],
                exec: ["exec"]
            };
        default:
            return {
                installDev: ["i", "-D"],
                run: ["run"],
                exec: ["exec"]
            };
    }
}
