import { MdArrowUpward } from "react-icons/md";
import { User } from "../../models/User";
import { Avatar } from "../ui/Avatar";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import clsx from "clsx";
import { Link } from "react-router-dom";

export interface RankingCardItem {
  position: number;
  user: User;
  totalUpvotes: number;
}

interface RankingCardProps {
  items: RankingCardItem[];
}
export function RankingCard({ items }: RankingCardProps) {
  return (
    <Card>
      <header className="flex items-center justify-between">
        <Link to="/rankings">
          <Heading size="xs" asChild>
            <h2 className="tracking-wider hover:underline">Top contributors</h2>
          </Heading>
        </Link>
        <Text>this month</Text>
      </header>

      <ul className="mt-6">
        {items.map((item) => (
          <li key={item.user.id}>
            <div className="flex items-center py-1">
              <span
                className={clsx(
                  "size-6 text-sm rounded-full flex items-center justify-center mr-3 font-semibold",
                  {
                    "bg-amber-500": item.position === 1,
                    "bg-agorium-300 text-agorium-900": item.position === 2,
                    "bg-orange-600": item.position === 3,
                    "text-agorium-400": ![1, 2, 3].includes(item.position),
                  },
                )}
              >
                {item.position}
              </span>
              <Avatar
                size="sm"
                name={item.user.fullName}
                url={item.user.avatar}
              />
              <span className="ml-3 flex flex-1 text-xs truncate tracking-wider">
                {item.user.fullName} Da Silva Soares
              </span>
              <Text asChild>
                <span className="ml-3 flex items-center tracking-wider">
                  <MdArrowUpward /> {item.totalUpvotes}
                </span>
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
