export default function Loading() {
  return (
    <div className="container-app section animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 mb-10">
        <div className="hidden lg:block h-64 bg-background-light rounded" />
        <div className="h-80 bg-background-light rounded" />
      </div>

      <div className="h-6 w-40 bg-background-light rounded mb-6" />
      <div className="product-grid mb-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-background-light rounded" />
            <div className="h-4 w-3/4 bg-background-light rounded" />
            <div className="h-4 w-1/2 bg-background-light rounded" />
          </div>
        ))}
      </div>

      <div className="h-6 w-40 bg-background-light rounded mb-6" />
      <div className="product-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-background-light rounded" />
            <div className="h-4 w-3/4 bg-background-light rounded" />
            <div className="h-4 w-1/2 bg-background-light rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
