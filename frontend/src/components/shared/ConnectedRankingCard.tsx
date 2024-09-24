import { useEffect } from "react";
import { userService } from "../../services/userService";
import { useGenericResource } from "../../hooks/resources/useGenericResource";
import { RankingCard } from "./RankingCard";

export function ConnectedRankingCard() {
  const rankingResource = useGenericResource({
    alias: "ranking",
    fetch: userService.getRanking,
    expiresIn: 1000 * 60 * 60,
  });

  useEffect(() => {
    rankingResource.fetchData({ page: 1, limit: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (rankingResource.loading) return "loading";
  if (!rankingResource.data?.data) return "Not found";

  return <RankingCard items={rankingResource.data.data} />;
}
