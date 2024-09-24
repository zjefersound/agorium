import { IconType } from "react-icons";
import { ISelectOption } from "../../models/ISelectOption";
import clsx from "clsx";

interface TabOption extends ISelectOption {
  Icon?: IconType;
}
interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  options: TabOption[];
  placement?: "left" | "center" | "rigth";
}
export function Tabs({
  value,
  onChange,
  options,
  placement = "center",
}: TabsProps) {
  return (
    <nav className="overflow-x-auto">
      <ul
        className={clsx("flex space-x-3 p-3 border-b-2 border-agorium-700", {
          "justify-center": placement === "center",
          "justify-start": placement === "left",
          "justify-end": placement === "rigth",
        })}
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => onChange(option.value)}
              className={clsx(
                "flex rounded-full px-5 whitespace-nowrap items-center text-sm h-10",
                {
                  "bg-agorium-700 text-agorium-50 font-semibold":
                    value === option.value,
                  "bg-agorium-900 hover:bg-agorium-700": value !== option.value,
                },
              )}
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
