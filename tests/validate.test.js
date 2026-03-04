import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DotsConfig } from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

describe("DotsConfig validation – valid fixtures", () => {
  const validDir = path.join(dataDir, "valid");
  const files = fs.readdirSync(validDir);
  for (const file of files) {
    test(`valid file ${file} should pass`, () => {
      const json = loadJson(path.join(validDir, file));
      expect(() => DotsConfig.parse(json)).not.toThrow();
    });
  }
});

describe("DotsConfig validation – invalid fixtures", () => {
  const invalidDir = path.join(dataDir, "invalid");
  const files = fs.readdirSync(invalidDir);
  for (const file of files) {
    test(`invalid file ${file} should fail`, () => {
      const json = loadJson(path.join(invalidDir, file));
      expect(() => DotsConfig.parse(json)).toThrow();
    });
  }
});
