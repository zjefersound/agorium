import { MdAdd, MdLogout } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { Avatar } from "../ui/Avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { AlertDialog } from "../ui/AlertDialog";
import { DrawerMenu } from "../shared/DrawerMenu";
import clsx from "clsx";
import { Logo } from "../assets/Logo";
import { HeaderSearch } from "../shared/HeaderSearch";

export function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between gap-x-3 px-[var(--page-padding-x)]">
      <Link to={"/"} className="flex items-center">
        <Logo />
        <p
          className={clsx(
            "font-serif font-bold text-amber-100", // always
            "hidden", // sm
            "md:block md:text-2xl md:ml-3", // md
            "lg:ml-6 lg:text-[2rem]", // lg
          )}
        >
          Agorium
        </p>
      </Link>
      <HeaderSearch />
      <div className="flex">
        <Link to="/new-post" className="mr-6 max-md:hidden">
          <Button>
            <MdAdd className="size-6 mr-2" /> Create
          </Button>
        </Link>
        <div className="relative group">
          <div className="flex items-center space-x-4 max-md:hidden">
            <Avatar name={user!.fullName} url={user!.avatar} />
            <p
              title={user!.fullName}
              className="hidden md:flex flex-1 font-serif text-amber-100 max-w-52 truncate"
            >
              {printFirstAndLastName(user!.fullName)}
            </p>
          </div>
          <div className="absolute transition-[.3s] opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none bg-agorium-800 ring-1 ring-agorium-700 rounded-md p-3 shadow-lg">
            <AlertDialog
              confirmText="Log Out"
              title="Are you sure you want to log out?"
              description="Any unsaved changes will be lost permanently."
              onConfirm={handleLogout}
            >
              <Button color="secondary">
                <MdLogout className="size-6 mr-2" /> Log Out
              </Button>
            </AlertDialog>
          </div>
        </div>
        <Link to="/new-post" className="mr-3 flex md:hidden">
          <Button>
            <MdAdd className="size-6" />
          </Button>
        </Link>
        <DrawerMenu />
      </div>
    </header>
  );
}
