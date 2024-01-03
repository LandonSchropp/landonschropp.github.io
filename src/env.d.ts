declare module "*.svg?raw" {
  export default string;
}

declare module "*.svg?react" {
  import { FunctionComponent, ComponentProps } from "react";
  export default FunctionComponent<ComponentProps<"svg">>;
}
