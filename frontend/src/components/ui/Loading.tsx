import clsx from "clsx";
interface Props {
  /**
   * Optional classes (TW won't appear on storybook)
   */
  className?: string;
  /**
   * Loading size
   */
  size?: "sm" | "md" | "lg";
}

export function Loading({ className = "", size = "md" }: Props) {
  return (
    <div
      className={clsx(
        "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className,
        { "h-4 w-4": size === "sm" },
        { "h-8 w-8": size === "md" },
        { "h-12 w-12": size === "lg" },
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}