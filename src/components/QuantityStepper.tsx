import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : "h-11 w-11 text-sm";
  const icon = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-secondary`}
      >
        <Minus className={icon} />
      </button>
      <span className={`min-w-8 text-center ${size === "sm" ? "text-xs" : "text-sm"} tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-secondary`}
      >
        <Plus className={icon} />
      </button>
    </div>
  );
}
