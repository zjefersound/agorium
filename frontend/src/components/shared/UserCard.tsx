import { LuAward } from "react-icons/lu";
import { Avatar } from "../ui/Avatar";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { formatCompactNumber } from "../../utils/formatCompactNumber";
import { formatOrdinals } from "../../utils/formatOrdinals";

interface UserCardProps {
  name: string;
  username: string;
  totalUpvotes: number;
  totalComments: number;
  totalPosts: number;
  rankingPosition: number;
  url?: string;
}
export function UserCard({
  name,
  totalPosts,
  totalComments,
  totalUpvotes,
  username,
  rankingPosition,
  url,
}: UserCardProps) {
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
        {rankingPosition > 100 && "+"}
      </p>
      <div className="w-full space-y-2 mt-4">
        <p className="flex justify-between tracking-wider font-semibold">
          <span>Aura:</span>
          <span>{formatCompactNumber(totalUpvotes)}</span>
        </p>
        <p className="flex justify-between tracking-wider">
          <span>Posts:</span>
          <span>{formatCompactNumber(totalPosts)}</span>
        </p>
        <p className="flex justify-between tracking-wider">
          <span>Comments:</span>
          <span>{formatCompactNumber(totalComments)}</span>
        </p>
      </div>
    </Card>
  );
}
