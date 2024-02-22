type LoadingHeaderProps = {
  title: string;
};

export default function LoadingHeader({ title }: LoadingHeaderProps) {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">{title}</h2>
    </div>
  );
}
