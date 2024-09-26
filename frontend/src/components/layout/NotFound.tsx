import { Link } from "react-router-dom";
import bgImage from "../../assets/404.png";

export function NotFound() {
  return (
    <div className="flex flex-1 lg:justify-evenly items-center max-lg:flex-col overflow-auto">
      <img
        className="w-[80%] max-w-[600px] "
        src={bgImage}
        alt="Greek society"
      />
      <div className="lg:w-[40%] p-8">
        <h1 className="text-amber-100 max-lg:text-[64px] max-lg:leading-[80px] text-[128px] leading-[150px] font-serif font-bold">
          404
        </h1>
        <h2 className="text-[36px] font-bold max-lg:leading-10 max-lg:mb-4">
          Lost in the Labyrinth
        </h2>
        <p className="text-agorium-400 max-lg:text-sm tracking-wider font-light">
          You've strayed from the path, like Theseus without a thread. The page
          you seek is as hidden as the Minotaur's lair.
        </p>
        <nav className="flex flex-col my-6 gap-4">
          <Link to="/" className=" text-agorium-300 hover:text-amber-100">
            🏛️ Return to the Agora
          </Link>
          <Link to="/" className=" text-agorium-300 hover:text-amber-100">
            🔍 Consult the Oracle
          </Link>
        </nav>
        <p className="text-agorium-400 max-lg:text-sm tracking-wider font-light">
          Even Odysseus found his way home—let's help you find yours!
        </p>
      </div>
    </div>
  );
}
