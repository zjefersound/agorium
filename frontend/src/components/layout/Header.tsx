import { MdAdd, MdLogout, MdOutlineSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { TextInput } from "../form/TextInput";
import { Avatar } from "../ui/Avatar";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/Button";
import { AlertDialog } from "../ui/AlertDialog";
import { Dictionary } from "lodash";
import { DrawerMenu } from "../shared/DrawerMenu";
import clsx from "clsx";
import { Logo } from "../assets/Logo";

export function Header() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("text") ?? "");
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (searchText) {
      const searchObject: Dictionary<string> = {
        text: searchText,
      };
      if (searchParams.get("order")) {
        searchObject.order = searchParams.get("order")!;
      }
      navigate({
        pathname: "/search",
        search: createSearchParams(searchObject).toString(),
      });
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <header className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between gap-x-3 px-[var(--page-padding-x)]">
      <Link to={"/"} className="flex items-center">
        <Logo />
        <p
          className={clsx(
            "font-serif font-bold text-amber-100", // always
            "hidden", // sm
            "md:block md:text-2xl md:ml-3",
            "lg:ml-6 lg:text-[2rem]",
          )}
        >
          Agorium
        </p>
      </Link>
      <TextInput.Root
        className={clsx(
          "max-md:max-w-[44px] max-md:ml-auto",
          "md:max-w-[500px] focus-within:max-w-[500px] transition-[1s]",
        )}
      >
        <label
          htmlFor="search"
          className="flex -mx-2 px-2 -my-3 py-3 cursor-pointer"
        >
          <TextInput.Icon>
            <MdOutlineSearch
              className={clsx("size-5 shrink-0", {
                "text-amber-100": searchText.length,
              })}
            />
          </TextInput.Icon>
        </label>
        <input
          id="search"
          placeholder="Search Agorium..."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          className={clsx(
            "outline-0 bg-transparent text-agorium-50 placeholder:text-agorium-400",
            "flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
            "max-md:max-w-0 max-md:focus:max-w-full",
          )}
        />
      </TextInput.Root>
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
