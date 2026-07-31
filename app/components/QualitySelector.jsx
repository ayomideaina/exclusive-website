"use client";

export default function QuantitySelector({ value, onDecrease, onIncrease, size = "md" }) {
  const sizeClasses = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10";
  return (
    <div className="flex items-center border border-border rounded w-fit">
      <button onClick={onDecrease} className={`${sizeClasses} flex items-center justify-center`}>
        −
      </button>
      <span className={`${sizeClasses} flex items-center justify-center border-x border-border`}>
        {value}
      </span>
      <button onClick={onIncrease} className={`${sizeClasses} flex items-center justify-center`}>
        +
      </button>
    </div>
  );
}
