import { Empty } from "../../ui/Empty";
import { Text } from "../../ui/Text";
import { GoBack } from "../../ui/GoBack";

export function PostNotFound() {
  return (
    <Empty>
      <p className="to-amber-100 font-bold mb-3 text-center">Post not found</p>
      <Text asChild>
        <span className="text-center mb-6">
          Get a coffe, check the URL then try again 😉
        </span>
      </Text>
      <GoBack to="/" />
    </Empty>
  );
}
