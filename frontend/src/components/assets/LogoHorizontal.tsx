import { Logo } from "./Logo";

export function LogoHorizontal() {
  return (
    <div className="flex">
      <Logo />
      <p className="font-serif font-bold text-[2rem] text-amber-100 ml-6">
        Agorium
      </p>
    </div>
  );
}
