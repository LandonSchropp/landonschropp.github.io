import { it } from "@jest/globals";
import { configure } from "@testing-library/dom";

// Monkey patch Jest so that tests written without a function implementation are marked as `todo`.
type FunctionParameter = (() => void | undefined) | (() => Promise<unknown>);

const wrappedIt = (description: string, func?: FunctionParameter) => {
  if (!func) {
    return it.todo(description);
  }

  return it(description, func);
};

Object.assign(wrappedIt, it);

globalThis.it = wrappedIt as jest.It;

// Configure the testing library.
configure({ testIdAttribute: "data-test-id" });
