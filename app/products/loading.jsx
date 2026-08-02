export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-4 w-40 bg-background-light rounded mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 mb-16">
        <div className="hidden md:flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-background-light rounded aspect-square" />
          ))}
        </div>

        <div className="bg-background-light rounded h-96" />

        <div className="flex flex-col gap-4">
          <div className="h-8 w-3/4 bg-background-light rounded" />
          <div className="h-4 w-1/2 bg-background-light rounded" />
          <div className="h-6 w-1/4 bg-background-light rounded" />
          <div className="h-20 w-full bg-background-light rounded" />
          <div className="h-12 w-full bg-background-light rounded" />
        </div>
      </div>
    </div>
  );
}
