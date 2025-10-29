import fs from "node:fs/promises";
import path from "node:path";
import { execa } from "execa";
import ejs from "ejs";

export async function setupHusky(options: any) {
    const tplLint = await fs.readFile(path.resolve("./src/templates/lint-staged.config.ejs"), "utf8");
    const tplHusky = await fs.readFile(path.resolve("./src/templates/husky-pre-commit.ejs"), "utf8");
    const outLint = ejs.render(tplLint, options);
    const outHusky = ejs.render(tplHusky, options);
    await fs.writeFile("lint-staged.config.js", outLint, "utf8");
    await fs.writeFile(".husky/pre-commit", outHusky, "utf8");

    try {
        await execa("npx", ["husky", "install"], { stdio: "inherit" });
        await execa("npx", ["husky", "add", ".husky/pre-commit", "npx lint-staged"], { stdio: "inherit" });
        console.log("Husky hooks installed");
    } catch (err) {
        console.warn("Husky setup failed; run `npx husky install` manually.");
    }
}
