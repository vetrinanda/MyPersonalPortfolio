import { useId } from "react";
import { cn } from "@/lib/utils";

export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    duration = 2.5,
    ...props
}) {
    const id = useId();

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-neutral-500/80 dark:fill-neutral-400/80",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <animate
                        attributeName="x"
                        from="0"
                        to={width}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        from="0"
                        to={height}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                    />
                    <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
    );
}

export default DotPattern;
