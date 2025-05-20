import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NMContainerProps {
  children: ReactNode;
  className?: string;
  withDottedBackground?: boolean;
}

const NMContainer = ({
  children,
  className = "",
  withDottedBackground = false,
}: NMContainerProps) => {
  return (
    <div className={`relative ${withDottedBackground ? "min-h-screen" : ""}`}>
      {/* Optional dotted background pattern */}
      {withDottedBackground && (
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
      )}

      {/* Container content with z-index to appear above the background */}
      <div className={`container mx-auto px-5 relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default NMContainer;
