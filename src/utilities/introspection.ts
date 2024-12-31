import { Children, ComponentType, isValidElement, ReactElement, ReactNode } from "react";

/**
 * Determines if the provided node is a React element of the given component type.
 * @param node The node to check.
 * @param type The component type to check the node against.
 * @returns Whether the provided node is a React element of the provided type.
 */
function isElementOfType<T>(node: ReactNode, type: ComponentType<T>): node is ReactElement<T> {
  return isValidElement(node) && node.type === type;
}

/**
 * Returns the children of the given React element.
 * @param node The React element to check.
 * @returns The children contained in the provided node. If the node does not have any children, an
 * empty array will be returned instead. Is the node is already an array, it will be returned as is.
 */
function extractChildren(node: ReactNode): ReactNode[] {
  if (Array.isArray(node)) {
    return node;
  }

  if (isValidElement(node) && "children" in node) {
    return Children.toArray(node.children);
  }

  return [];
}

/**
 * Recursively extracts and transforms the elements of the given type which are ancestors of the
 * provided node.
 * @param node The React element to recursively transform.
 */
export function recursivelyExtractType<R, T>(
  node: ReactNode,
  type: ComponentType<T>,
  transform: (node: ReactElement<T>) => R,
): R[] {
  if (isElementOfType(node, type)) {
    return [transform(node)];
  }

  return extractChildren(node).flatMap((child) => {
    return recursivelyExtractType(child, type, transform);
  });
}
