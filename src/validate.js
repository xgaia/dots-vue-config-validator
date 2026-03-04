#!/usr/bin/env node

import fs from "node:fs";

import { z } from "zod";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { DotsConfig, GenericConfig } from "./schema.js";

const argv = yargs(hideBin(process.argv))
  .describe("generic-config")
  .boolean("generic-config")
  .command("[files..]")
  .parse();

const isGenericConfig = argv.genericConfig;
const filePathes = argv["_"];

const data = {};

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

let error = false;
Object.entries(data).forEach(([filePath, elem]) => {
  let parsedConfig;
  if (isGenericConfig) {
    parsedConfig = GenericConfig.safeParse(elem.json);
  } else {
    parsedConfig = DotsConfig.safeParse(elem.json);
  }

  if (!parsedConfig.success) {
    error = true;
    console.error(`❌ ${filePath}: Validation errors:\n`);
    console.error(z.prettifyError(parsedConfig.error), "\n");
  } else {
    console.log(`✅ ${filePath}: Configuration is valid`);
  }
});
if (error) {
  process.exit(1);
}
