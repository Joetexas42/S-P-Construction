import { cn } from "@/lib/utils";

export function FilterChip({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      data-active={active}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] sm:min-h-0",
        active
          ? "bg-secondary text-white border-secondary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-secondary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
