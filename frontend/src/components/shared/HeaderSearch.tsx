import { MdOutlineSearch } from "react-icons/md";
import { TextInput } from "../form/TextInput";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { Dictionary } from "lodash";
import clsx from "clsx";

export function HeaderSearch() {
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
  );
}
