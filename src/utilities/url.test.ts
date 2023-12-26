import { baseURL } from "./url";

describe("baseURL", () => {
  it("returns the base URL", () => {
    expect(baseURL("https://example.com/path/to/file")).toBe("https://example.com");
  });
});
