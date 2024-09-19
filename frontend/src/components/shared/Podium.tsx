import { RankingDataItem } from "../../examples/mocks/mocks";
import { Crown } from "../assets/Crown";
import { Avatar } from "../ui/Avatar";
import { PodiumInfo } from "./PodiumInfo";

interface PodiumProps {
  items: RankingDataItem[];
}
export function Podium({ items }: PodiumProps) {
  return (
    <div className="flex justify-center items-end w-[342px] h-[294px]">
      <div className="flex items-center flex-col">
        <div className="w-[68px] h-[68px] top-[86px] left-[246] bg-agorium-200 p-1 rounded-full">
          <Avatar
            size="full"
            name={"teste"}
            url={
              "https://cdn.awsli.com.br/600x1000/2515/2515067/produto/23384010353bd9f5651.jpg"
            }
          />
        </div>
        <span className="flex justify-center items-center text-agorium-900 font-semibold  bg-agorium-200 w-6 h-6 rounded-full -mt-3 mb-3">
          2
        </span>
        <PodiumInfo
          className="bg-agorium-600 w-[110px] min-h-[112px] rounded-l-xl"
          item={items[1]}
        />
      </div>
      <div className="flex items-center flex-col">
        <Crown className="mb-1" />
        <div className="w-[82px] h-[82px] top-[31px] left-[355px] bg-amber-500 p-1 rounded-full">
          <Avatar
            size="full"
            name={"teste"}
            url={
              "https://cdn.awsli.com.br/600x1000/2515/2515067/produto/23384010353bd9f5651.jpg"
            }
          />
        </div>
        <span className="flex justify-center items-center bg-amber-500 w-6 h-6 rounded-full -mt-3 mb-3">
          1
        </span>
        <PodiumInfo
          className="bg-agorium-700 w-[112px] h-[159px] rounded-t-3xl"
          item={items[0]}
        />
      </div>
      <div className="flex items-center flex-col">
        <div className="w-[68px] h-[68px] top-[86px] left-[246px] bg-orange-900 p-1 rounded-full">
          <Avatar
            size="full"
            name={"teste"}
            url={
              "https://cdn.awsli.com.br/600x1000/2515/2515067/produto/23384010353bd9f5651.jpg"
            }
          />
        </div>
        <span className="flex justify-center items-center bg-orange-900 w-6 h-6 rounded-full -mt-3 mb-3">
          3
        </span>
        <PodiumInfo
          className="bg-agorium-600 w-[110px] min-h-[112px] rounded-r-xl"
          item={items[2]}
        />
      </div>
    </div>
  );
}
