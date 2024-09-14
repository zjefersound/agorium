import { Crown } from "../components/assets/Crown";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { Avatar } from "../components/ui/Avatar";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";

export function Rankings() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <NavigationCard />
        <PopularItemCard
          title="Popular tags"
          path="/tags"
          items={[
            { id: 1, label: "#biology", totalPosts: 53 },
            { id: 7, label: "#math", totalPosts: 43 },
            { id: 8, label: "#science", totalPosts: 41 },
            { id: 9, label: "#englsih", totalPosts: 31 },
            { id: 10, label: "#history", totalPosts: 12 },
          ]}
        />
        <PopularItemCard
          title="Popular categories"
          path="/categories"
          items={[
            { id: 2, label: "Issue", totalPosts: 286 },
            { id: 3, label: "Discussion", totalPosts: 233 },
            { id: 4, label: "Feedback", totalPosts: 211 },
            { id: 5, label: "Debate", totalPosts: 173 },
            { id: 6, label: "Tutorials", totalPosts: 163 },
          ]}
        />
      </Content.Sidebar>
      <Content.Main>
        <div className="flex items-center">
          <GoBack to={"/"} hideText />
          <Heading size="lg" asChild>
            <h2 className="text-amber-100 ml-3">{"Rankings"}</h2>
          </Heading>
        </div>
        <Card className="flex justify-center">
          <div className="flex justify-center items-end w-[342px] h-[294px]">
            <div className="flex items-center flex-col">
              <div className="w-[68px] h-[68px] top-[86px] left-[246] bg-agorium-200 p-1 rounded-full ">
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
              <div className="flex justify-between items-center gap-y-3 p-3 bg-agorium-600 w-[110px] h-[112px] rounded-l-xl flex-col">
                <div>
                  <span className="flex text-[13px] font-bold text-agorium-50 text-center flex-col">
                    Marcio
                  </span>
                  <span className="flex text-xs text-agorium-400">
                    @marecius2
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-bold  text-agorium-50 ">Aura 928</span>
                  <span className="text-xs text-agorium-400">316 posts</span>
                </div>
              </div>
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
              <div className="flex justify-between items-center space-y-3 gap-y-3 p-3 bg-agorium-700 w-full h-[159px] rounded-t-3xl flex-col truncate">
                <div>
                  <span className="flex text-[13px] font-bold text-agorium-50 text-center flex-col">
                    Nelson
                  </span>
                  <span className="flex text-xs text-agorium-400">
                    @nelson12344321
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-bold  text-agorium-50 ">Aura 928</span>
                  <span className="text-xs text-agorium-400">316 posts</span>
                </div>
              </div>
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
              <div className="flex justify-between items-center gap-y-3 p-3 bg-agorium-600 w-[110px] h-[112px]  rounded-r-xl flex-col">
                <div>
                  <span className="flex text-[13px] font-bold text-center text-agorium-50 flex-col">
                    Janete
                  </span>
                  <span className="flex text-xs text-agorium-400">
                    @janete12312
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-bold  text-agorium-50 ">Aura 928</span>
                  <span className="text-xs text-agorium-400">316 posts</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card>teste</Card>
      </Content.Main>
      <Content.Sidebar>
        <SimpleUserCard
          name="Joana Darc"
          rankingPosition={12}
          totalPosts={32}
          totalUpvotes={642123}
          username="@joanadarc"
          url=""
        />
      </Content.Sidebar>
    </Content.Root>
  );
}
