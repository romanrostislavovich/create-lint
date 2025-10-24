import fs from "node:fs/promises";
import path from "node:path";
import ejs from "ejs";

export async function buildPrettierConfig(options: any) {
    const tpl = await fs.readFile(path.resolve("./src/templates/prettier.config.ejs"), "utf8");
    const out = ejs.render(tpl, options);
    await fs.writeFile("prettier.config.cjs", out, "utf8");
    console.log("Created prettier.config.cjs");
}
