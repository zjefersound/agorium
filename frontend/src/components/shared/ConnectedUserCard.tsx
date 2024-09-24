import { memo, useEffect } from "react";
import { UserCard } from "./UserCard";
import { UserCardSkeleton } from "./skeletons/UserCardSkeleton";
import { Card } from "../ui/Card";
import { useResource } from "../../hooks/useResource";

function ConnectedUserCard({ id }: { id: number }) {
  const { userOverviewResource } = useResource();
  const { data, loading, fetchData } = userOverviewResource;
  useEffect(() => {
    fetchData(id);
  }, [id, fetchData]);
  if (loading) return <UserCardSkeleton />;
  if (!data) return <Card>Not found</Card>;
  return (
    <UserCard
      name={data.user.fullName}
      url={data.user.avatar}
      username={data.user.username}
      rankingPosition={data.rankingPosition}
      totalComments={data.totalComments}
      totalPosts={data.totalPosts}
      totalUpvotes={data.totalUpvotes}
    />
  );
}

const MemoizedConnectedUserCard = memo(ConnectedUserCard);
export { MemoizedConnectedUserCard as ConnectedUserCard };
