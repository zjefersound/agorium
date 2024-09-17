import { AlertDialog } from "../../../components/ui/AlertDialog";
import { HoverDropdown } from "../../../components/ui/HoverDropdown";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineMoreVert,
} from "react-icons/md";
interface CommentActionsDropdownProps {
  onDelete: () => void;
  onEdit: () => void;
}
export function CommentActionsDropdown({
  onDelete,
  onEdit,
}: CommentActionsDropdownProps) {
  return (
    <HoverDropdown.Root>
      <HoverDropdown.Trigger>
        <div className="hover:bg-agorium-700 p-1 rounded-full">
          <MdOutlineMoreVert className="size-6" />
        </div>
      </HoverDropdown.Trigger>
      <HoverDropdown.Content className="top-8 w-28" placement="right">
        <HoverDropdown.Button onClick={onEdit}>
          <MdOutlineEdit className="size-6 mr-2 shrink-0 text-amber-100" />
          Edit
        </HoverDropdown.Button>
        <AlertDialog
          confirmText="Delete comment"
          title="Are you sure you want to delete this comment?"
          description="You won't be able to undo this action"
          onConfirm={onDelete}
        >
          <HoverDropdown.Button className="text-red-400">
            <MdDeleteOutline className="size-6 mr-2 shrink-0" />
            Delete
          </HoverDropdown.Button>
        </AlertDialog>
      </HoverDropdown.Content>
    </HoverDropdown.Root>
  );
}
