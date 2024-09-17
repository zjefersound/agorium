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
import { HoverDropdown } from "../ui/HoverDropdown";

export function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="h-[var(--header-height)] max-w-full shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between gap-x-3 px-[var(--page-padding-x)]">
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
      <div className="flex shrink-0">
        <Link to="/new-post" className="mr-6 max-md:hidden">
          <Button>
            <MdAdd className="size-6 mr-2" /> Create
          </Button>
        </Link>
        <HoverDropdown.Root>
          <HoverDropdown.Trigger>
            <div className="flex items-center space-x-4 max-md:hidden group-hover:bg-agorium-700 -my-2 py-2 p-2 rounded-md">
              <Avatar name={user!.fullName} url={user!.avatar} />
              <div className="flex flex-col">
                <p
                  title={user!.fullName}
                  className="hidden md:flex flex-1 font-serif text-amber-100 max-w-52 truncate"
                >
                  {printFirstAndLastName(user!.fullName)}
                </p>
                <span className="text-agorium-400 text-xs">
                  @{user!.username}
                </span>
              </div>
              <MdOutlineExpandMore className="size-5" />
            </div>
          </HoverDropdown.Trigger>

          <HoverDropdown.Content
            className="top-10 w-[240px]"
            placement="center"
          >
            <Link to="/profile">
              <HoverDropdown.Button>
                <MdPersonOutline className="size-6 mr-2 text-amber-100" />{" "}
                <p>Profile</p>
              </HoverDropdown.Button>
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
          </HoverDropdown.Content>
        </HoverDropdown.Root>
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
