export function CheckLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={
        "inline-flex h-6 align-top items-center text-slate-900 text-sm ml-2 " +
        props.className
      }
    />
  );
}
