export default function SectionHeader({ eyebrow, title, titleAddon, action }) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      {eyebrow && (
        <div className="flex items-center gap-4">
          <span className="w-5 h-10 bg-primary rounded-sm" />
          <span className="text-primary font-semibold">{eyebrow}</span>
        </div>
      )}
      {(title || titleAddon || action) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-end gap-6 flex-wrap">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                {title}
              </h2>
            )}
            {titleAddon}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  );
}
