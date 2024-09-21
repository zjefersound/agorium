import { MdOutlineSortByAlpha, MdOutlineWhatshot } from "react-icons/md";
import { RxArrowTopRight, RxClock } from "react-icons/rx";

export const POST_SORT_BY = {
  createdAt: "createdAt",
  title: "title",
  upvotes: "upvotes",
  totalComments: "totalComments",
  favoriteCommentId: "favoriteCommentId",
};

export const DEFAULT_POST_SORT_OPTIONS = [
  { label: "Relevance", value: POST_SORT_BY.upvotes },
  { label: "Newest", value: POST_SORT_BY.createdAt },
];

const availableSortOptions = [POST_SORT_BY.createdAt, POST_SORT_BY.title];

export const HOME_POST_SORT_OPTIONS = [
  { Icon: RxClock, label: "New", value: POST_SORT_BY.createdAt },
  { Icon: RxArrowTopRight, label: "Top", value: POST_SORT_BY.upvotes },
  { Icon: MdOutlineWhatshot, label: "Hot", value: POST_SORT_BY.totalComments },
  {
    Icon: MdOutlineSortByAlpha,
    label: "Alphabetic",
    value: POST_SORT_BY.title,
  },
].filter((o) => availableSortOptions.includes(o.value));
