import { Link } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { Text } from "../../components/ui/Text";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { MdOutlineEdit } from "react-icons/md";

export function ProfileCard() {
  const { user } = useAuth();
  return (
    <Card className="flex items-center gap-6">
      <div className="size-[96px] md:size-[128px]">
        <Avatar name={user!.fullName} url={user!.avatar} size="full" />
      </div>
      <div className="space-y-2 flex flex-col flex-1 overflow-hidden">
        <p
          title={user!.fullName}
          className="tracking-wider font-serif font-bold truncate"
        >
          {user!.fullName}
        </p>

        <Text asChild>
          <p className="tracking-wider text-agorium-50 font-bold truncate">
            @{user!.username}
          </p>
        </Text>
        <Text asChild>
          <p className="tracking-wider truncate">{user!.email}</p>
        </Text>
        <Text asChild>
          <p className="tracking-wider truncate">Since {user!.createdAt}</p>
        </Text>
      </div>
      <Link to={`/profile/edit`} className="ml-auto mb-auto">
        <Button color="secondary" size="sm">
          <MdOutlineEdit className="size-5 mr-2" />
          Edit
        </Button>
      </Link>
    </Card>
  );
}
