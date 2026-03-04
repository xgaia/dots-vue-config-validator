#!/usr/bin/env node

import fs from "node:fs";

import { z } from "zod";

import { DotsConfig } from "./schema.js";

if (process.argv.length < 3) {
  console.error("Usage: yarn run validate <path-to-config>.json");
  process.exit(1);
}

const filePath = process.argv[2];
let raw;
try {
  raw = fs.readFileSync(filePath, "utf-8");
} catch (e) {
  console.error("❌ Unable to read file:", e.message);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("❌ Invalid JSON:", e.message);
  process.exit(1);
}

try {
  DotsConfig.parse(data);
  console.log("✅ Configuration is valid");
  process.exit(0);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("❌ Validation errors:\n");
    console.error(z.prettifyError(e), "\n");
  } else {
    console.error("❌ Unexpected error:", e);
  }
  process.exit(1);
}
