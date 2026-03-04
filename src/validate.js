#!/usr/bin/env node

import fs from "node:fs";

import { z } from "zod";

import { DotsConfig } from "./schema.js";

if (process.argv.length < 3) {
  console.error("Usage: yarn run validate <path-to-config>.json");
  process.exit(1);
}

const data = {};

const filePathes = process.argv.slice(2);
try {
  filePathes.forEach((filePath) => {
    data[filePath] = { raw: fs.readFileSync(filePath, "utf-8"), json: null };
  });
} catch (e) {
  console.error("❌ Unable to read file:", e.message);
  process.exit(1);
}

try {
  filePathes.forEach((filePath) => {
    data[filePath].json = JSON.parse(data[filePath].raw);
  });
} catch (e) {
  console.error("❌ Invalid JSON:", e.message);
  process.exit(1);
}

Object.entries(data).forEach(([filePath, elem]) => {
  const toto = DotsConfig.safeParse(elem.json);
  if (!toto.success) {
    console.error(`❌ ${filePath}: Validation errors:\n`);
    console.error(z.prettifyError(toto.error), "\n");
  } else {
    console.log(`✅ ${filePath}: Configuration is valid`);
  }
});
