import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function ElementLoader({
  loading,
  children,
  className,
}: LoaderProps) {
  return loading ? (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <div className="w-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a8"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#F4C543"></stop>
            <stop offset=".3" stopColor="#F4C543" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#F4C543" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#F4C543" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#F4C543" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            transformOrigin="center"
            fill="none"
            stroke="url(#a8)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="1.5"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transformOrigin="center"
            fill="none"
            opacity=".2"
            stroke="#F4C543"
            strokeWidth="8"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    </div>
  ) : (
    { children }
  );
}
