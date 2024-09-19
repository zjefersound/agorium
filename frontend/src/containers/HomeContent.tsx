import { MdOutlineCheckCircleOutline, MdOutlineWhatshot } from "react-icons/md";
import { RxArrowTopRight, RxClock } from "react-icons/rx";
import { SmallTabs } from "../components/ui/SmallTabs";
import { PostList } from "../components/shared/PostList";

export function HomeContent() {
  return (
    <div className="flex flex-col space-y-6">
      <SmallTabs
        value="new"
        onChange={() => {}}
        options={[
          { Icon: RxClock, label: "New", value: "new" },
          { Icon: RxArrowTopRight, label: "Top", value: "top" },
          { Icon: MdOutlineWhatshot, label: "Hot", value: "hot" },
          {
            Icon: MdOutlineCheckCircleOutline,
            label: "Closed",
            value: "closed",
          },
        ]}
      />
      <PostList />
    </div>
  );
}
