import { Card } from '../../ui/Card'
import { Skeleton } from '../../ui/Skeleton'

export function PostCardSkeleton() {
  return (
    <Card className="space-y-6 h-[240px]">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[60%]" />
      <Skeleton className="h-4 w-[70%]" />
    </Card>
  )
}
