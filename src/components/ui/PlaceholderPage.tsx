type Props = {
  title        : string;
  description? : string;
};

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}