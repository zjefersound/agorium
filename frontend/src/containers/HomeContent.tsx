import { MdOutlineCheckCircleOutline, MdOutlineWhatshot } from "react-icons/md";
import { RxArrowTopRight, RxClock } from "react-icons/rx";
import { SmallTabs } from "../components/ui/SmallTabs";
import { PostList } from "../components/shared/PostList";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const orderOptions = [
  { Icon: RxClock, label: "New", value: "createdAt" },
  { Icon: RxArrowTopRight, label: "Top", value: "top" },
  { Icon: MdOutlineWhatshot, label: "Hot", value: "hot" },
  {
    Icon: MdOutlineCheckCircleOutline,
    label: "Closed",
    value: "favoriteCommentId",
  },
];

export function HomeContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOrder = searchParams.get("sortBy") || "createdAt";
  const handleSelectOrder = useCallback((sortBy: string) => {
    setSearchParams((p) => ({ ...p, sortBy }));
  }, []);
  return (
    <div className="flex flex-col space-y-6">
      <SmallTabs
        value={selectedOrder}
        onChange={handleSelectOrder}
        options={orderOptions}
      />
      <PostList hideDefaultFilters />
    </div>
  );
}
