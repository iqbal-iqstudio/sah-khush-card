export default function Loading() {
  return (
    <div className="container-shell py-8">
      <div className="mb-6 h-10 w-48 animate-pulse rounded bg-alabaster" />
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <div className="hidden h-96 rounded-2xl bg-alabaster lg:block" />
        <div>
          <div className="mb-4 h-4 w-40 animate-pulse rounded bg-alabaster" />
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-alabaster">
                <div className="aspect-[3/4] w-full animate-pulse bg-taupe/10" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-taupe/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-taupe/10" />
                  <div className="h-4 w-20 animate-pulse rounded bg-taupe/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
