import { readFileSync, writeFileSync } from "fs";

const file = readFileSync("src/generated/graphql.ts", "utf8");
const typeMap = {};
const typeRegex = /export type (\w+) = \{[\s\S]*?^\};/gm;
let match;
while ((match = typeRegex.exec(file))) {
  typeMap[match[1]] = match[0].replace(/^export /, "");
}

function collectTypes(root, seen = new Set()) {
  if (seen.has(root) || !typeMap[root]) return "";
  seen.add(root);
  let typeDef = typeMap[root];
  const referenced = [...typeDef.matchAll(/\b([A-Z]\w+)\b/g)]
    .map((m) => m[1])
    .filter((t) => t !== root && typeMap[t]);
  return (
    typeDef + "\n" + referenced.map((t) => collectTypes(t, seen)).join("\n")
  );
}

const schema = collectTypes("Resume");
writeFileSync("src/generated/resume-schema.txt", schema);
