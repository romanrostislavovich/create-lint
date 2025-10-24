import fs from "node:fs/promises";
import path from "node:path";
import ejs from "ejs";

export async function buildStylelintConfig(options: any) {
    const tpl = await fs.readFile(path.resolve("./src/templates/stylelint.config.ejs"), "utf8");
    const out = ejs.render(tpl, options);
    await fs.writeFile("stylelint.config.js", out, "utf8");
    console.log("Created stylelint.config.js");
}
