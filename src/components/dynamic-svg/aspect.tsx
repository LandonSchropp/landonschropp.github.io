import { DynamicSVGAspect } from "@/types";
import React from "react";

type DynamicSVGAspectProps = Omit<DynamicSVGAspect, "rows"> & {
  /** The shapes contained in the aspect, as well as their surrounding markup. */
  children: React.ReactNode;
};

/** An aspect represents one of the possible arrangements of the shapes and markup. */
export function Aspect(_: DynamicSVGAspectProps) {
  // NOTE: This component isn't actually used to render anything. Rather, it's used when
  // introspecting the content provided to `DynamicSVG` to extract the aspects and their metadata.
  return null;
}
