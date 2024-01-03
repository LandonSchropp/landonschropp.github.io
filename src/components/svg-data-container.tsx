"use client";

import type { ReactNode } from "react";
import flannel from "../images/flannel.png";

type SvgDataContainerProps = {
  viewBox: string;
  children: ReactNode;
  title: string;
};

export default function SvgDataContainer({ viewBox, children, title }: SvgDataContainerProps) {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <svg
        className="block w-[calc(100%-6vw)] h-[calc(100%-6vw)] portrait:w-[calc(100%-8vh)] portrait:h-[calc(100%-8vh)]"
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
