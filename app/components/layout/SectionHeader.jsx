export default function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      {eyebrow && (
        <div className="flex items-center gap-4">
          <span className="w-5 h-10 bg-primary rounded-sm" />
          <span className="text-primary font-semibold">{eyebrow}</span>
        </div>
      )}
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
              {title}
            </h2>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  );
}
