interface Props {
  message?: string;
}
export function FieldError({ message }: Props) {
  if (!message) return null;

  return (
    <span role="alert" className="text-sm text-red-600">
      {message}
    </span>
  );
}
