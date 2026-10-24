export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="aspect-63/88 animate-pulse rounded-card bg-surface-raised" />
      ))}
    </div>
  );
}