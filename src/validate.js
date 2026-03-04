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

filePathes.forEach((filePath) => {
  let raw, json;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(`❌ Unable to read ${filePath}:`, e.message);
  }
  try {
    json = JSON.parse(raw);
  } catch (e) {
    console.error(`❌ Invalid JSON ${filePath}:`, e.message);
  }
  data[filePath] = { raw: raw, json: json };
});

Object.entries(data).forEach(([filePath, elem]) => {
  const toto = DotsConfig.safeParse(elem.json);
  if (!toto.success) {
    console.error(`❌ ${filePath}: Validation errors:\n`);
    console.error(z.prettifyError(toto.error), "\n");
  } else {
    console.log(`✅ ${filePath}: Configuration is valid`);
  }
});
