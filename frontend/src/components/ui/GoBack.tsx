import clsx from "clsx";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

interface GoBackProps {
  to: string;
  hideText?: boolean;
}
export function GoBack({ to, hideText }: GoBackProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center hover:bg-agorium-800 w-min -my-1 py-1 rounded-full",
        {
          "-mx-1 px-1": hideText,
          "-mx-2 px-2": !hideText,
        },
      )}
    >
      <MdArrowBack className="size-6 text-amber-100" />
      {!hideText && (
        <span className="text-agorium-400 ml-3 text-sm tracking-wider whitespace-nowrap">
          Go Back
        </span>
      )}
    </Link>
  );
}
