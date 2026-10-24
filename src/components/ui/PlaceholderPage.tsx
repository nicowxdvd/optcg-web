type Props = {
  title        : string;
  description? : string;
};

export default function PlaceholderPage({ title, description }: Props) {
  return (
<div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <h1 className="font-display text-3xl text-fg">{title}</h1>
      {description && <p className="text-sm text-fg-muted">{description}</p>}
    </div>
  );
}