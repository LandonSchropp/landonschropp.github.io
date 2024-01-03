"use client";

import flannel from "../images/flannel.png";
import type { ReactNode } from "react";

type SvgDataContainerProps = {
  viewBox: string;
  children: ReactNode;
  title: string;
};

export default function SvgDataContainer({ viewBox, children, title }: SvgDataContainerProps) {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <svg
        className="block h-[calc(100%-6vw)] w-[calc(100%-6vw)] portrait:h-[calc(100%-8vh)] portrait:w-[calc(100%-8vh)]"
        viewBox={viewBox}
      >
        <defs>
          <pattern id="svg-data-background" patternUnits="userSpaceOnUse" width={80} height={80}>
            <image href={flannel.src} x={0} y={0} width={80} height={80} />
          </pattern>
        </defs>

        <title role="heading">{title}</title>
        {children}
      </svg>
    </main>
  );
}
