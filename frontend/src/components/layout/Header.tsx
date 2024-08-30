import { MdOutlineSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { LogoHorizontal } from "../assets/LogoHorizontal";
import { TextInput } from "../form/TextInput";
import { Avatar } from "../ui/Avatar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("text") ?? "");
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (searchText) {
      navigate("/search");
      setSearchParams({ text: searchText });
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <header className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between px-[var(--page-padding-x)]">
      <LogoHorizontal />
      <TextInput.Root className=" w-min min-w-[500px] max-w-full">
        <TextInput.Icon>
          <MdOutlineSearch />
        </TextInput.Icon>
        <TextInput.Input
          placeholder="Search Agorium..."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
      </TextInput.Root>
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
