// tests/validate.test.js
import { DotsConfig } from "../src/index.js";

describe("DotsConfig schema validation", () => {
  test("valid config passes validation", () => {
    const validConfig = { collectionId: "my-collection", footerSettings: {} };
    expect(() => DotsConfig.parse(validConfig)).not.toThrow();
  });

  test("missing required collectionId fails validation", () => {
    const invalidConfig = {};
    expect(() => DotsConfig.parse(invalidConfig)).toThrow();
  });
});
