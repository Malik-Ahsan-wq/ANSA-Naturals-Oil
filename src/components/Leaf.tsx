import type { SVGProps } from "react";

type LeafProps = SVGProps<SVGSVGElement> & {
  variant?: "a" | "b" | "c";
};

export default function Leaf({
  variant = "a",
  className,
  ...props
}: LeafProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {variant === "a" && (
        <g>
          <path
            d="M50 6 C28 16 16 40 20 62 C24 84 40 94 50 96 C58 94 58 78 62 66 C68 48 70 30 74 16 C66 10 58 8 50 6Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M50 18 C44 30 42 46 46 60 C52 62 58 60 60 52"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="2"
            fill="none"
          />
        </g>
      )}
      {variant === "b" && (
        <g>
          <path
            d="M20 8 C44 16 66 38 76 66 C62 76 44 80 30 76 C16 72 8 60 10 46 C12 30 16 14 20 8Z"
            fill="currentColor"
          />
          <path
            d="M30 30 C40 16 50 10 60 12 C56 28 48 44 38 54 C30 60 24 62 22 56 C20 50 24 40 30 30Z"
            fill="#ffffff"
            fillOpacity="0.2"
          />
        </g>
      )}
      {variant === "c" && (
        <g>
          <ellipse cx="50" cy="52" rx="30" ry="44" fill="currentColor" opacity="0.7" />
          <path d="M50 8 L52 24 L54 40 L58 88" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
          <path
            d="M52 22 C74 26 84 36 86 48 C74 48 62 44 54 34 M50 60 C64 74 74 80 82 84 C76 88 62 88 50 86"
            stroke="#ffffff"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
        </g>
      )}
    </svg>
  );
}