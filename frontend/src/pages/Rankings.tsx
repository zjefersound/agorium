import { Content } from "../components/layout/Content";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";
import { GlobalSidebar } from "../components/shared/GlobalSidebar";
import { Podium } from "../components/shared/Podium";
import { PodiumList } from "../components/shared/PodiumList";
import { Tabs } from "../components/ui/Tabs";
import { useEffect, useState } from "react";
import { ConnectedUserCard } from "../components/shared/ConnectedUserCard";
import { useAuth } from "../hooks/useAuth";
import { useGenericResource } from "../hooks/resources/useGenericResource";
import { RankedUser, userService } from "../services/userService";
import { Pagination } from "../components/ui/Pagination";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { ISearchableOptions } from "../models/ISearchableOptions";

const RANKING_FILTER_ENABLED = false;

export function Rankings() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("month");
  const rankingResource = useGenericResource<
    IPaginatedResponse<RankedUser>,
    ISearchableOptions
  >({
    alias: "ranking",
    fetch: userService.getRanking,
    expiresIn: 1000 * 60 * 5, // 5 min
  });
  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };
  const [firstPageItems, setFirstPageItems] = useState<RankedUser[]>([]);
  useEffect(() => {
    rankingResource.fetchData({ page }).then((data) => {
      if (page === 1) setFirstPageItems(data.data);
    });
  }, [page]);

  if (rankingResource.loading && page === 1) return "loading";
  if (!rankingResource.data?.data) return "Not found";
  return (
    <Content.Root>
      <Content.Sidebar>
        <GlobalSidebar />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex items-center">
          <GoBack to={"/"} hideText />
          <Heading size="lg" asChild>
            <h2 className="text-amber-100 ml-3">{"Rankings"}</h2>
          </Heading>
        </div>
        {RANKING_FILTER_ENABLED && (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            options={[
              { label: "Month", value: "month" },
              { label: "Year", value: "year" },
              { label: "All time", value: "all time" },
            ]}
          />
        )}
        <Card className="flex flex-col items-center">
          <Podium items={firstPageItems} />
          <PodiumList items={rankingResource.data.data} />
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={rankingResource.data.pagination.totalPages}
          />
        </Card>
      </Content.Main>
      <Content.Sidebar>
        <ConnectedUserCard id={user!.id} />
      </Content.Sidebar>
    </Content.Root>
  );
}
