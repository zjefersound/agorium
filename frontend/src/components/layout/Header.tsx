import {
  MdAdd,
  MdLogout,
  MdOutlineExpandMore,
  MdPersonOutline,
} from "react-icons/md";
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
        <div className="relative group flex flex-row-reverse">
          <div className="flex items-center space-x-4 max-md:hidden group-hover:bg-agorium-700 -my-2 py-2 p-2 rounded-md">
            <Avatar name={user!.fullName} url={user!.avatar} />
            <div className="flex flex-col">
              <p
                title={user!.fullName}
                className="hidden md:flex flex-1 font-serif text-amber-100 max-w-52 truncate"
              >
                {printFirstAndLastName(user!.fullName)}
              </p>
              <span className="text-agorium-400 text-xs">{user!.username}</span>
            </div>
            <MdOutlineExpandMore className="size-5" />
          </div>
          <div
            className={clsx(
              "absolute",
              "transition-[.5s] top-10",
              "opacity-0 pointer-events-none",
              "group-hover:opacity-100 group-hover:pointer-events-auto",
              "w-[240px]",
            )}
          >
            <svg
              className="styles_Arrow__vmR9C block rotate-180 mx-auto mt-3 fill-agorium-700 "
              width="10"
              height="5"
              viewBox="0 0 30 10"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 30,0 15,10"></polygon>
            </svg>
            <div
              className={clsx(
                "bg-agorium-800 ring-1 ring-agorium-700 rounded-md p-2 shadow-lg ",
                "space-y-1",
                "shadow-[0px_10px_38px_-10px_rgba(0,_0,_0,_0.4),_0px_8px_16px_-15px_rgba(22,_23,_24,_0.9)]",
              )}
            >
              <Link to="/profile">
                <button className="flex hover:bg-agorium-700 w-full rounded p-1">
                  <MdPersonOutline className="size-6 mr-2 text-amber-100" />{" "}
                  <p>Profile</p>
                </button>
              </Link>
              <AlertDialog
                confirmText="Log Out"
                title="Are you sure you want to log out?"
                description="Any unsaved changes will be lost permanently."
                onConfirm={handleLogout}
              >
                <button className="flex hover:bg-agorium-700 w-full rounded p-1">
                  <MdLogout className="size-6 mr-2 text-amber-100" />{" "}
                  <p>Log Out</p>
                </button>
              </AlertDialog>
            </div>
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
