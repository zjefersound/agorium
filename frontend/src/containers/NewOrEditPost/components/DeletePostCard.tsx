import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Text } from "../../../components/ui/Text";

export function DeletePostCard() {
  const { id } = useParams();
  const handleDeletePost = () => {
    alert("Delete post: " + id);
  };
  return (
    <Card className="space-y-6 flex flex-col">
      <Text asChild>
        <span className="tracking-wider">
          Delete your post forever. You can’t undo this.
        </span>
      </Text>
      <Button
        className="w-100 justify-center"
        onClick={handleDeletePost}
        color="danger"
      >
        Delete post
      </Button>
    </Card>
  );
}
