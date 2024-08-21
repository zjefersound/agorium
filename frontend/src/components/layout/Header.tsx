import { LogoHorizontal } from "../assets/LogoHorizontal";

export function Header() {
  return (
    <div className="h-20 shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center px-8">
      <LogoHorizontal />
    </div>
  );
}
