import { MdArrowUpward } from "react-icons/md";
import { RankingDataItem } from "../../examples/mocks/mocks";
import { Avatar } from "../ui/Avatar";
import clsx from "clsx";

interface PodiumList {
  items: RankingDataItem[];
}
export function PodiumList({ items }: PodiumList) {
  return (
    <table className="w-full border-separate border-spacing-x-3 mt-6">
      <colgroup>
        <col span={1} className="w-6" />
        <col span={1} className="w-[36px]" />
        <col span={1} className="w-full" />
        <col span={1} className="w-auto" />
        <col span={1} className="w-auto" />
      </colgroup>
      <tbody>
        {items.map((item) => (
          <tr key={item.position}>
            <td>
              <span
                className={clsx(
                  "size-6 text-sm rounded-full flex items-center justify-center font-semibold",
                  {
                    "bg-amber-500": item.position === 1,
                    "bg-agorium-300 text-agorium-900": item.position === 2,
                    "bg-orange-900": item.position === 3,
                  },
                )}
              >
                {item.position}
              </span>
            </td>
            <td>
              <div
                className={clsx("w-[36px] h-[36px] p-1 rounded-full", {
                  "bg-amber-500": item.position === 1,
                  "bg-agorium-300 text-agorium-900": item.position === 2,
                  "bg-orange-900": item.position === 3,
                  "text-agorium-400": ![1, 2, 3].includes(item.position),
                })}
              >
                <Avatar
                  size="full"
                  name={"teste"}
                  url={
                    "https://cdn.awsli.com.br/600x1000/2515/2515067/produto/23384010353bd9f5651.jpg"
                  }
                />
              </div>
            </td>
            <td className="tracking-wider">{item.user.fullName}</td>
            <td>
              <span className="whitespace-nowrap flex items-center justify-end w-full tracking-wider text-agorium-400">
                {item.totalPosts} posts
              </span>
            </td>
            <td>
              <span className="flex items-center justify-end w-full tracking-wider text-agorium-400">
                <MdArrowUpward /> {item.totalUpvotes}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
