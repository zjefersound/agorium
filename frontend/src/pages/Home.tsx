import { Card } from "../components/ui/Card";

export function Home() {
  return (
    <div
      className={`
        overflow-y-auto overflow-x-hidden
        grid 
        grid-cols-1
        md:grid-cols-[var(--left-bar-width)_auto_var(--right-bar-width)]
        px-[var(--page-padding-x)] justify-center
      `}
    >
      <div className="hidden md:block space-y-6 py-6 sticky top-0 h-[var(--content-height)] overflow-auto">
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </div>
      <div
        className={`
          py-6 px-[var(--main-content-padding-x)] space-y-6 
          w-[var(--main-content-width)] 
          max-w-[var(--main-content-max-width)] 
        `}
      >
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
        <Card className="h-[300px]">Center</Card>
      </div>
      <div className="hidden md:block space-y-6 py-6 sticky top-0 h-[var(--content-height)] overflow-auto">
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
        <Card className="h-[200px]">asdsa</Card>
      </div>
    </div>
  );
}
