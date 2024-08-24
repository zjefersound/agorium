import { IconType } from "react-icons";
import { ISelectOption } from "../../models/ISelectOption";
import clsx from "clsx";

interface TabOption extends ISelectOption {
  Icon?: IconType;
}
interface SmallTabsProps {
  value: string;
  onChange: (value: string) => void;
  options: TabOption[];
}
export function SmallTabs({ value, onChange, options }: SmallTabsProps) {
  return (
    <nav className="overflow-x-auto">
      <ul className="flex space-x-3">
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={clsx(
                "flex items-center text-sm h-8 rounded-full px-2.5",
                {
                  "bg-amber-100 text-agorium-900 font-semibold":
                    value === option.value,
                  "bg-agorium-700 hover:bg-agorium-600": value !== option.value,
                },
              )}
              onClick={() => onChange(option.value)}
            >
              {option.Icon && <option.Icon className="size-4 mr-2" />}
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
