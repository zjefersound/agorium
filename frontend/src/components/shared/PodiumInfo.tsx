import clsx from "clsx";
import { RankingDataItem } from "../../examples/mocks/mocks";
import { getFirstName } from "../../utils/getFirstName";

interface PodiumInfoProps {
  item: RankingDataItem;
  className: string;
}

export function PodiumInfo({ item, className }: PodiumInfoProps) {
  return (
    <div
      className={clsx(
        "flex justify-between items-center gap-y-3 p-3 flex-colflex space-y-3 flex-col",
        className,
      )}
    >
      <div className="w-full">
        <span className="flex text-[13px] font-bold text-center text-agorium-50 flex-col w-full">
          {getFirstName(item.user.fullName)}
        </span>
        <span className=" text-xs text-agorium-400 line-clamp-1 text-center break-all w-full">
          {item.user.username}
        </span>
      </div>
      <div className="flex flex-col text-center">
        <span className="font-bold  text-agorium-50 ">
          Aura {item.totalUpvotes}
        </span>
        <span className="text-xs text-agorium-400">
          {item.totalPosts} posts
        </span>
      </div>
    </div>
  );
}
