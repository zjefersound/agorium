import Lottie from "lottie-react";
import emptyAnimation from "../../assets/splash-screen.json";

export function SplashScreen() {
  return (
    <div className="m-auto size-[200px]">
      <Lottie animationData={emptyAnimation} loop={true} />
    </div>
  );
}
