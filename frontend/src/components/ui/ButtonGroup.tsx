import { ISelectOption } from "../../models/ISelectOption";
import clsx from "clsx";

interface ButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: ISelectOption[];
}
export function ButtonGroup({ value, onChange, options }: ButtonGroupProps) {
  return (
    <div className="h-10 rounded-md border-[1px] border-agorium-700 p-1 space-x-1 bg-agorium-800">
      {options.map((option) => (
        <button
          key={option.value}
          className={clsx(
            "h-full rounded px-3 text-sm font-bold tracking-wider text-agorium-50",
            { "bg-agorium-600": value === option.value },
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
