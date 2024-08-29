import { ReactNode } from "react";
import emptyAnimation from "../../assets/empty-animation.json";
import Lottie from "lottie-react";
export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[13rem] h-[13rem]">
        <Lottie animationData={emptyAnimation} loop={false} />
      </div>
      {children}
    </div>
  );
}
