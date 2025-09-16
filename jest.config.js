const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/.build/"],
  transform: {
    ...tsJestTransformCfg,
  },
};