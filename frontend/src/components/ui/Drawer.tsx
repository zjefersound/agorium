import clsx from "clsx";
import { PiX, PiList } from "react-icons/pi";
import { ReactNode } from "react";
import { Logo } from "../assets/Logo";

interface DrawerRootProps {
  children: ReactNode;
  open: boolean;
}

function DrawerRoot({ children, open }: DrawerRootProps) {
  return (
    <div
      className={clsx(
        "fixed h-full w-full bg-agorium-800 top-0 left-0 transition-all z-90 flex flex-col",
        {
          "translate-x-full": !open,
        },
      )}
    >
      {children}
    </div>
  );
}
DrawerRoot.displayName = "Drawer.Root";

interface DrawerHeaderProps {
  setOpen: (open: boolean) => void;
}

function DrawerHeader({ setOpen }: DrawerHeaderProps) {
  return (
    <div className="px-3 py-4 h-[var(--header-height)] flex items-center border-b-2 border-agorium-700 z-10">
      <Logo />
      <h2 className="font-bold ml-3">Menu</h2>
      <button className="ml-auto" onClick={() => setOpen(false)}>
        <PiX className="h-8 w-8 text-agorium-400" />
      </button>
    </div>
  );
}
DrawerHeader.displayName = "Drawer.Header";

interface DrawerHamburgerProps {
  setOpen: (open: boolean) => void;
  className?: string;
}

function DrawerHamburger({ setOpen, className }: DrawerHamburgerProps) {
  return (
    <div className={clsx("ml-auto", className)}>
      <button onClick={() => setOpen(true)}>
        <PiList className="h-8 w-8 text-amber-100" />
      </button>
    </div>
  );
}
DrawerHamburger.displayName = "Drawer.Hamburger";

export const Drawer = {
  Root: DrawerRoot,
  Header: DrawerHeader,
  Hamburger: DrawerHamburger,
};
