import { Card } from "../components/ui/Card";

export function Home() {
  return (
    <div className="px-[var(--page-padding-x)] grid grid-cols-[var(--left-bar-width)_auto_var(--right-bar-width)] justify-center overflow-auto">
      <div className="space-y-6 py-6 sticky top-0 h-[calc(100dvh-var(--header-height))] overflow-auto">
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
      </div>
      <div className="w-[var(--main-content-width)] max-w-[var(--main-content-max-width)] p-6">
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
      </div>
      <div className="space-y-6 py-6 sticky top-0 h-[calc(100dvh-var(--header-height))] overflow-auto">
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
        <Card>asdsa</Card>
        <Card>Left 2</Card>
        <Card>Left 2</Card>
      </div>
    </div>
  );
}
