import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { LogoHorizontal } from "../assets/LogoHorizontal";
import { Avatar } from "../ui/Avatar";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between px-[var(--page-padding-x)]">
      <LogoHorizontal />

      <div className="flex items-center space-x-4">
        <Avatar name={user!.fullName} url={user!.avatar} />
        <p
          title={user!.fullName}
          className="hidden md:flex flex-1 font-serif text-amber-100 max-w-52 truncate"
        >
          {printFirstAndLastName(user!.fullName)}
        </p>
      </div>
    </header>
  );
}
