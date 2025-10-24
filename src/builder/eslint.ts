import fs from "node:fs/promises";
import path from "node:path";
import ejs from "ejs";

export async function buildESLintConfig(options: any) {
    const tpl = await fs.readFile(path.resolve("./src/templates/.eslintrc.ejs"), "utf8");
    const out = ejs.render(tpl, options);
    await fs.writeFile(".eslintrc.json", out, "utf8");
    console.log("Created .eslintrc.json");
}
