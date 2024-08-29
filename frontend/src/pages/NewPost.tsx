import { useRef } from "react";
import { TextEditor } from "../components/form/TextEditor";
import { Content } from "../components/layout/Content";
import { NavigationCard } from "../components/shared/NavigationCard";
import { PopularItemCard } from "../components/shared/PopularItemCard";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function NewPost() {
  const contentRef = useRef("");
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
        <TextEditor
          markdown="# Hello world"
          onChange={(text) => {
            contentRef.current = text;
          }}
        />
      </Content.Main>
      <Content.Sidebar>
        <Card>Anything</Card>
        <Button onClick={() => console.log(contentRef.current)}>Show MD</Button>
      </Content.Sidebar>
    </Content.Root>
  );
}
