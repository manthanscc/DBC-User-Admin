"use client";

import { forwardRef, useEffect, useId, useState, useCallback } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement>; // Container ref
  fromRef: React.RefObject<HTMLElement>; // From element ref
  toRef: React.RefObject<HTMLElement>; // To element ref
  curvature?: number; // Curvature of beam
  reverse?: boolean; // Reverse direction
  duration?: number; // Duration of animation
  delay?: number; // Delay before animation starts
  pathColor?: string; // SVG path color
  pathWidth?: number; // SVG path width
  pathOpacity?: number; // SVG path opacity
  gradientStartColor?: string; // Gradient start color
  gradientStopColor?: string; // Gradient stop color
  className?: string; // Additional classes
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false, // Set default to false
      duration = 5,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#ffaa40",
      gradientStopColor = "#9c40ff",
      className,
    },
    ref,
  ) => {
    const id = useId();
    const [pathD, setPathD] = useState("");
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    // Calculate path between two elements
    const updatePath = useCallback(() => {
      if (
        containerRef.current &&
        fromRef.current &&
        toRef.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({
          width: svgWidth,
          height: svgHeight,
        });

        const startX = rectA.left - containerRect.left + rectA.width / 2;
        const startY = rectA.top - containerRect.top + rectA.height / 2;
        const endX = rectB.left - containerRect.left + rectB.width / 2;
        const endY = rectB.top - containerRect.top + rectB.height / 2;

        const controlPointX = startX + (endX - startX) / 2;
        const controlPointY = startY + (endY - startY) / 2 - curvature;

        const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
        setPathD(d);
      }
    }, [containerRef, fromRef, toRef, curvature]);

    useEffect(() => {
      // Initialize path
      updatePath();

      // Set up resize observer to update path on container resize
      const resizeObserver = new ResizeObserver(() => {
        // On the next frame (to ensure DOM is updated)
        requestAnimationFrame(() => {
          updatePath();
        });
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [updatePath, containerRef]);

    return (
      <svg
        fill="none"
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className,
        )}
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        ref={ref}
      >
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={`${id}-gradient`}
            gradientUnits="userSpaceOnUse"
            gradientTransform={reverse ? "rotate(180)" : ""}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" offset="0%" />
            <stop stopColor={gradientStartColor} offset="32%" />
            <stop stopColor={gradientStopColor} offset="62%" />
            <stop stopColor={gradientStopColor} stopOpacity="0" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
        <path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#${id}-gradient)`}
          strokeOpacity="1"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,200;100,200;100,200"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="200;100;0"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  },
);

AnimatedBeam.displayName = "AnimatedBeam";