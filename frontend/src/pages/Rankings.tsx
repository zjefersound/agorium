import clsx from "clsx";
import { Crown } from "../components/assets/Crown";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { SimpleUserCard } from "../components/shared/SimpleUserCard";
import { Avatar } from "../components/ui/Avatar";
import { Card } from "../components/ui/Card";
import { GoBack } from "../components/ui/GoBack";
import { Heading } from "../components/ui/Heading";
import { users } from "../examples/mocks/mocks";
import { MdArrowUpward } from "react-icons/md";
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const rankingData = [
  {
    id: Math.random(),
    user: users[0],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[1],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[2],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[3],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[4],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[5],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[1],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[2],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[3],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[4],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
  {
    id: Math.random(),
    user: users[5],
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
  },
].map((item, index) => {
  return {
    ...item,
    position: index + 1,
  };
});
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
        <Card className="flex flex-col items-center">
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
          <table className="w-full border-separate border-spacing-x-3 mt-6">
            <colgroup>
              <col span={1} className="w-6" />
              <col span={1} className="w-[36px]" />
              <col span={1} className="w-full" />
              <col span={1} className="w-auto" />
              <col span={1} className="w-auto" />
            </colgroup>
            <tbody>
              {rankingData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span
                      className={clsx(
                        "size-6 text-sm rounded-full flex items-center justify-center font-semibold",
                        {
                          "bg-amber-500": item.position === 1,
                          "bg-agorium-300 text-agorium-900":
                            item.position === 2,
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
        </Card>
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
