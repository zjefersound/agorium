import { LuAward } from "react-icons/lu";
import { Avatar } from "../ui/Avatar";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import { formatOrdinals } from "../../utils/formatOrdinals";

interface SimpleUserCardProps {
  name: string;
  username: string;
  totalUpvotes: number;
  totalPosts: number;
  rankingPosition: number;
  url?: string;
}
export function SimpleUserCard({
  name,
  totalPosts,
  totalUpvotes,
  username,
  rankingPosition,
  url,
}: SimpleUserCardProps) {
  return (
    <Card className="flex flex-col items-center">
      <Avatar name={name} url={url} size="2xl" />
      <Text asChild size="xl">
        <p
          className="mt-6 font-bold text-agorium-50 text-center truncate w-full"
          title={username}
        >
          {username}
        </p>
      </Text>
      <p className="text-amber-100 flex items-center text-xl font-bold mt-2">
        <LuAward className="size-6 mr-1" />
        {formatOrdinals(rankingPosition)}
      </p>
      <span className="tracking-wider text-agorium-400 mt-2">
        {formatCompactNumber(totalUpvotes)} upvotes -{" "}
        {formatCompactNumber(totalPosts)} posts
      </span>
    </Card>
  );
}
