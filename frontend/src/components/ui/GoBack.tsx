import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

interface GoBackProps {
  to: string;
}
export function GoBack({ to }: GoBackProps) {
  return (
    <Link
      to={to}
      className="flex items-center hover:bg-agorium-800 w-min -mx-2 px-2 -my-1 py-1 rounded-full"
    >
      <MdArrowBack className="size-6 text-amber-100 mr-3" />
      <span className="text-agorium-400 text-sm tracking-wider whitespace-nowrap">
        Go Back
      </span>
    </Link>
  );
}
