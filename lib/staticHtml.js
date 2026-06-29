import fs from "fs";
import path from "path";

export function readMainHtml(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  const html = fs.readFileSync(filePath, "utf8");
  const match = html.match(/<main[^>]*>[\s\S]*?<\/main>/i);

  if (!match) {
    throw new Error(`Missing <main> content in ${fileName}`);
  }

  return match[0];
}
