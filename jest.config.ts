import type { JestConfigWithTsJest } from "ts-jest";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    ".ts": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }],
  },
  setupFilesAfterEnv: ["jest-extended", "<rootDir>/jest.setup.ts"],
} satisfies JestConfigWithTsJest;
