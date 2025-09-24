import * as React from "react";
import clsx from "clsx";

/**
 * Visible rotating gradient border / beam.
 * Put inside a parent with class: relative overflow-hidden rounded-2xl (or similar).
 * It renders two layers: a glowing blurred layer + a crisp layer.
 */
export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  duration?: number; // seconds per full rotation
  thickness?: number; // px border thickness
  blur?: number; // px blur for glow layer
  rounded?: string; // tailwind rounding class to inherit (fallback if parent not rounded)
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"],
  duration = 8,
  thickness = 2,
  blur = 8,
  rounded = "rounded-2xl",
  className,
  style,
  ...rest
}) => {
  const id = React.useId().replace(/:/g, "");
  const gradient = `conic-gradient(${colors.concat(colors[0]).join(",")})`;

  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0",
        rounded,
        className
      )}
      style={style}
      {...rest}
    >
      {/* Glow layer */}
      <div
        className={clsx("absolute inset-0", rounded)}
        style={{
          padding: thickness,
          filter: `blur(${blur}px) brightness(1.2) saturate(1.4)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div
          className={clsx("absolute inset-0", rounded)}
          style={{
            background: gradient,
            animation: `${id}-spin ${duration}s linear infinite`,
            opacity: 0.9,
          }}
        />
      </div>
      {/* Crisp layer */}
      <div
        className={clsx("absolute inset-0", rounded)}
        style={{
          padding: thickness,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div
          className={clsx("absolute inset-0", rounded)}
          style={{
            background: gradient,
            animation: `${id}-spin ${duration}s linear infinite`,
            opacity: 0.4,
            mixBlendMode: "plus-lighter",
          }}
        />
      </div>
      <style>{`
        @keyframes ${id}-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default BorderBeam;
