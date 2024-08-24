import { RankingCardItem } from "../../components/shared/RankingCard";
import { Category } from "../../models/Category";
import { Post } from "../../models/Post";
import { User } from "../../models/User";

const users: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    avatar: "https://example.com/avatar1.png",
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-08-01T10:00:00Z",
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    avatar: "https://example.com/avatar2.png",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-08-05T12:00:00Z",
  },
  {
    id: 3,
    username: "michael_brown",
    email: "michael.brown@example.com",
    fullName: "Michael Brown",
    avatar: "https://example.com/avatar3.png",
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-08-10T10:00:00Z",
  },
  {
    id: 4,
    username: "emily_white",
    email: "emily.white@example.com",
    fullName: "Emily White",
    avatar: "https://example.com/avatar4.png",
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-08-15T10:00:00Z",
  },
  {
    id: 5,
    username: "daniel_jones",
    email: "daniel.jones@example.com",
    fullName: "Daniel Jones",
    avatar: "https://example.com/avatar5.png",
    createdAt: "2024-04-20T09:00:00Z",
    updatedAt: "2024-08-20T10:00:00Z",
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Programming",
    description:
      "Posts related to programming languages, techniques, and best practices.",
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
    user: users[0],
    tags: [
      { id: 1, name: "TypeScript" },
      { id: 2, name: "JavaScript" },
    ],
    comments: [
      {
        id: 1,
        content: "Great post! Really helped me understand TypeScript better.",
        createdAt: "2024-08-01T11:00:00Z",
        updatedAt: "2024-08-01T11:00:00Z",
        postId: 1,
        userId: 2,
        user: users[1],
        upvotes: [
          {
            id: 1,
            voteType: "upvote",
            createdAt: "2024-08-01T12:00:00Z",
            userId: 1,
            commentId: 1,
            user: users[0],
          },
        ],
      },
    ],
    upvotes: [
      {
        id: 3,
        voteType: "upvote",
        createdAt: "2024-08-01T12:30:00Z",
        userId: 2,
        postId: 1,
        user: users[1],
      },
    ],
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
    comments: [
      {
        id: 2,
        content: "React makes building UI components a breeze!",
        createdAt: "2024-08-05T13:00:00Z",
        updatedAt: "2024-08-05T13:00:00Z",
        postId: 2,
        userId: 1,
        user: users[0],
        upvotes: [
          {
            id: 4,
            voteType: "upvote",
            createdAt: "2024-08-05T14:00:00Z",
            userId: 2,
            commentId: 2,
            user: users[1],
          },
        ],
      },
    ],
    upvotes: [
      {
        id: 5,
        voteType: "upvote",
        createdAt: "2024-08-05T15:00:00Z",
        userId: 1,
        postId: 2,
        user: users[0],
      },
    ],
  },
  {
    id: 3,
    title: "Getting Started with Node.js",
    content: [
      "# Getting Started with Node.js",
      "test code",
      "test code",
      "# Getting Started with Node.js",
      "```",
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
    upvotes: [
      {
        id: 6,
        voteType: "upvote",
        createdAt: "2024-08-11T10:00:00Z",
        userId: 2,
        postId: 3,
        user: users[1],
      },
    ],
  },
  {
    id: 4,
    title: "Deep Dive into JavaScript Engines",
    content:
      "JavaScript engines are the heart of modern web development. They convert your high-level code into machine code that the browser can execute. Engines like Google's V8, Mozilla's SpiderMonkey, and Apple's JavaScriptCore have optimized techniques for just-in-time (JIT) compilation, garbage collection, and inline caching, which significantly boost performance. Understanding how these engines work can help developers write more efficient code, debug complex performance issues, and take full advantage of the language's capabilities. This article explores the internal workings of these engines, the trade-offs they make, and how developers can leverage them for optimized web applications. We will also touch on the latest advancements in WebAssembly and its interplay with JavaScript engines, offering unprecedented performance gains for web applications.",
    createdAt: "2024-08-15T10:00:00Z",
    updatedAt: "2024-08-15T12:00:00Z",
    categoryId: 1,
    userId: 2,
    category: categories[0],
    user: users[1],
    tags: [
      { id: 7, name: "JavaScript" },
      { id: 8, name: "Engines" },
    ],
    comments: [],
    upvotes: [
      {
        id: 7,
        voteType: "upvote",
        createdAt: "2024-08-15T14:00:00Z",
        userId: 1,
        postId: 4,
        user: users[0],
      },
    ],
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
