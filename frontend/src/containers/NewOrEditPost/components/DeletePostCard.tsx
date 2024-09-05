import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Text } from "../../../components/ui/Text";
import { AlertDialog } from "../../../components/ui/AlertDialog";
import { postService } from "../../../services/postService";
import { useToast } from "../../../hooks/useToast";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";

export function DeletePostCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { launchToast } = useToast();
  const handleDeletePost = () => {
    if (!id) return;
    postService
      .delete(id)
      .then(() => {
        navigate("/");
        launchToast({
          title: TOAST_MESSAGES.Post.deletedTitle,
          description: TOAST_MESSAGES.Post.deletedDescription,
        });
      })
      .catch(() => {
        launchToast({
          color: "danger",
          title: TOAST_MESSAGES.Post.deleteErrorTitle,
          description: TOAST_MESSAGES.Post.deleteErrorDescription,
        });
      });
  };
  return (
    <Card className="space-y-6 flex flex-col">
      <Text asChild>
        <span className="tracking-wider">
          Delete your post forever. You can’t undo this.
        </span>
      </Text>
      <AlertDialog
        confirmText="Delete post"
        title="Are you sure you want delete the post?"
        description="You won't be able to undo this action."
        onConfirm={handleDeletePost}
      >
        <Button className="w-100 justify-center" color="danger">
          Delete post
        </Button>
      </AlertDialog>
    </Card>
  );
}
