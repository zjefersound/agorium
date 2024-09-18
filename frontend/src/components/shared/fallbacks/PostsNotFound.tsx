import { Empty } from "../../ui/Empty";
import { Text } from "../../ui/Text";

export function PostsNotFound({ description }: { description: string }) {
  return (
    <Empty>
      <p className="to-amber-100 font-bold mb-3 text-center">
        No posts were found
      </p>
      <Text asChild>
        <span className="text-center">{description}</span>
      </Text>
    </Empty>
  );
}
