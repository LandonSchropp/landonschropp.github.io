import type { JestConfigWithTsJest } from "ts-jest";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }],
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  modulePaths: ["<rootDir>"],
  setupFilesAfterEnv: ["jest-extended", "<rootDir>/jest.setup.ts"],
} satisfies JestConfigWithTsJest;
