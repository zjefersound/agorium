import { LogoHorizontal } from "../assets/LogoHorizontal";

export function Header() {
  return (
    <div className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center px-[var(--page-padding-x)]">
      <LogoHorizontal />
    </div>
  );
}
