import type { SVGProps } from "react";

export default function OilDrop({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M32 4 C 36 18 58 34 58 50 C58 66 46 76 32 76 C18 76 6 66 6 50 C6 34 28 22 32 4Z"
        fill="currentColor"
      />
      <path
        d="M18 44 C 18 34 26 28 30 22 C 34 30 44 38 44 48 C44 56 40 60 34 62 C28 62 24 58 22 52"
        fill="#ffffff"
        fillOpacity="0.35"
      />
      <path
        d="M12 58 C 16 66 26 70 34 62"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}