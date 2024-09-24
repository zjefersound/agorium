import { RankingCardItem } from "../../components/shared/RankingCard";
import { Category } from "../../models/Category";
import { Post } from "../../models/Post";
import { Tag } from "../../models/Tag";
import { User } from "../../models/User";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const users: User[] = [
  {
    id: 1,
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    username: "pricilinha",
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-08-05T12:00:00Z",
  },
  {
    id: 3,
    username: "vitiligo123",
    email: "michael.jackson@example.com",
    fullName: "Michael Jackson",
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-08-10T10:00:00Z",
    avatar:
      "https://rollingstone.com.br/media/uploads/2023/06/michael-jackson-cantor-rei-do-pop-foto-jim-ruyman-pool-getty-images.jpg",
  },
  {
    id: 4,
    username: "emily_white",
    email: "emily.white@example.com",
    fullName: "Emily White",
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-08-15T10:00:00Z",
  },
  {
    id: 5,
    username: "daniel_jones",
    email: "daniel.jones@example.com",
    fullName: "Daniel Jones",
    createdAt: "2024-04-20T09:00:00Z",
    updatedAt: "2024-08-20T10:00:00Z",
  },
  {
    id: 6,
    username: "zjefersound",
    email: "zjefersound@example.com",
    fullName: "Jeferson Souza",
    createdAt: "2024-04-20T09:00:00Z",
    updatedAt: "2024-08-20T10:00:00Z",
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Issue",
    description: "Posts that require an answer to solve a problem.",
  },
];

export const mockedPosts: Post[] = [
  {
    id: 1,
    title: "Understanding TypeScript types vs interfaces",
    content:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-02T10:00:00Z",
    categoryId: 1,
    userId: 1,
    category: categories[0],
    user: users[5],
    tags: [
      { id: 1, name: "TypeScript" },
      { id: 2, name: "JavaScript" },
    ],
    totalUpvotes: 4,
    favoriteCommentId: 1,
    totalComments: 0,
  },
  {
    id: 2,
    title: "Introduction to React",
    content: "React is a JavaScript library for building user interfaces.",
    createdAt: "2024-08-05T12:00:00Z",
    updatedAt: "2024-08-06T12:00:00Z",
    categoryId: 1,
    userId: 2,
    category: categories[0],
    user: users[1],
    tags: [
      { id: 3, name: "React" },
      { id: 4, name: "Frontend" },
    ],
    totalUpvotes: 24,
    totalComments: 0,
    comments: [
      {
        id: 2,
        content: "React makes building UI components a breeze!",
        createdAt: "2024-08-05T13:00:00Z",
        updatedAt: "2024-08-05T13:00:00Z",
        postId: 2,
        userId: 1,
        user: users[0],
        totalUpvotes: 6,
        children: [],
      },
    ],
  },
  {
    id: 3,
    title: "Getting Started with Node.js",
    content: [
      "# Getting Started with Node.js",
      "`test code`",
      "test code",
      "# Getting Started with Node.js",
      "```js",
      "const abc = 123;",
      "```",
      "test code",
    ].join("\n"),
    createdAt: "2024-08-10T14:00:00Z",
    updatedAt: "2024-08-11T14:00:00Z",
    categoryId: 1,
    userId: 1,
    category: categories[0],
    user: users[0],
    tags: [
      { id: 5, name: "Node.js" },
      { id: 6, name: "Backend" },
    ],
    comments: [],
    totalUpvotes: 97,
    totalComments: 0,
  },
  {
    id: 4,
    title: "Deep Dive into JavaScript Engines",
    content:
      "JavaScript engines are the heart of modern web development. They convert your high-level code into machine code that the browser can execute.\n\nEngines like Google's V8, Mozilla's SpiderMonkey, and Apple's JavaScriptCore have optimized techniques for just-in-time (JIT) compilation, garbage collection, and inline caching, which significantly boost performance. Understanding how these engines work can help developers write more efficient code, debug complex performance issues, and take full advantage of the language's capabilities. This article explores the internal workings of these engines, the trade-offs they make, and how developers can leverage them for optimized web applications. We will also touch on the latest advancements in WebAssembly and its interplay with JavaScript engines, offering unprecedented performance gains for web applications.",
    createdAt: "2024-08-15T10:00:00Z",
    updatedAt: "2024-08-15T12:00:00Z",
    categoryId: 1,
    userId: 2,
    category: categories[0],
    user: users[1],
    tags: [
      { id: 7, name: "JavaScript" },
      { id: 8, name: "Engines" },
      { id: 9, name: "Eventloops" },
    ],
    comments: [],
    totalUpvotes: 12,
    totalComments: 0,
  },
];

export const rankingCardItems: RankingCardItem[] = [
  {
    position: 1,
    user: users[0], // john_doe
    totalUpvotes: 120,
  },
  {
    position: 2,
    user: users[1], // jane_smith
    totalUpvotes: 110,
  },
  {
    position: 3,
    user: users[2], // michael_brown
    totalUpvotes: 95,
  },
  {
    position: 4,
    user: users[3], // emily_white
    totalUpvotes: 85,
  },
  {
    position: 5,
    user: users[4], // daniel_jones
    totalUpvotes: 75,
  },
];
export interface RankingDataItem extends RankingCardItem {
  totalPosts: number;
}

const numberOfRecords = 11;

export const rankingData: RankingDataItem[] = Array.from(
  { length: numberOfRecords },
  (_, index) => ({
    id: Math.random(),
    user: users[index % users.length], // Cycles through users array
    totalPosts: randomIntFromInterval(30, 150),
    totalUpvotes: randomIntFromInterval(500, 1500),
    position: index + 1,
  }),
);

export const academicTags: Tag[] = [
  { id: 1, name: "Research Methodology" },
  { id: 2, name: "Literature Review" },
  { id: 3, name: "Data Analysis" },
  { id: 4, name: "Case Studies" },
  { id: 5, name: "Qualitative Research" },
  { id: 6, name: "Quantitative Research" },
  { id: 7, name: "Ethics in Research" },
  { id: 8, name: "Peer Review" },
  { id: 9, name: "Academic Writing" },
  { id: 10, name: "Funding and Grants" },
];
