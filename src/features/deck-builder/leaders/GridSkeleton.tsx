export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {
        Array.from({ length: 20 }, (_, i) => (
          <div
            key       = {i}
            className = "relative aspect-63/88 overflow-hidden rounded-card bg-surface-raised before:absolute before:inset-0 before:animate-[shimmer_1.5s_infinite] before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-fg/20 before:to-transparent"
          />
        ))
      }
    </div>
  );

}
