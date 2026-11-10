import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  className,
  align = "left",
  action,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="font-label mb-3 text-muted-foreground">
            <span aria-hidden="true" className="mr-1.5 text-brand-soft/70">{"//"} </span>
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl leading-[1.05] font-medium tracking-[-0.035em] sm:text-4xl lg:text-[2.9rem]">
          {title}
        </h2>
        {body && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {body}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Eyebrow({ children, className }) {
  return (
    <p className={cn("font-label text-muted-foreground", className)}>{children}</p>
  );
}
