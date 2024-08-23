import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Heading } from "../ui/Heading";

interface PopularItem {
  id: number;
  label: string;
  totalPosts: number;
}
interface PopularItemCardProps {
  title: string;
  path: string;
  items: PopularItem[];
}
export function PopularItemCard({ title, path, items }: PopularItemCardProps) {
  return (
    <Card>
      <Heading size="xs" asChild>
        <h2 className="tracking-wider">{title}</h2>
      </Heading>
      <ul className="mt-6 space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <Link to={`${path}/${item.id}`}>
              <div className="flex justify-between items-center py-1 rounded -mx-2 px-2 hover:bg-agorium-700">
                <span className="text-sm">{item.label}</span>
                <span className="text-agorium-400 text-sm">
                  {item.totalPosts} posts
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
