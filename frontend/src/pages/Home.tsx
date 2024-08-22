import { Content } from "../components/layout/Content";
import { Card } from "../components/ui/Card";

export function Home() {
  return (
    <Content.Root>
      <Content.Sidebar>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </Content.Sidebar>
      <Content.Main>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
      </Content.Main>
      <Content.Sidebar>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </Content.Sidebar>
    </Content.Root>
  );
}
