import { useAuthStore } from "@/store/useAuthStore";
import { CloneItem } from "@/types/clone.type";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
} from "@heroui/react";
import {
  ChatText,
  DotsThree,
  Pen,
  PhoneCall,
  Trash,
} from "@phosphor-icons/react";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";

interface CloneCardProps {
  clone: CloneItem;
}

export function CloneCard({ clone }: CloneCardProps) {
  const { name, description, knowledge } = clone;
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  return (
    <Card className="p-4">
      <CardBody className="overflow-visible p-0">
        <div className="flex gap-2">
          <div className="">
            <Avatar
              size={40}
              name={name}
              variant="marble"
              colors={["#7828c8", "#006FEE", "#f31260", "#f5a524"]}
            />
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <h4 className="text-small font-semibold">{name}</h4>
            <p className="text-tiny text-default-500 line-clamp-1">
              {description}
            </p>
            <p className="text-tiny text-default-400">
              Last interaction:{" "}
              {knowledge?.lastProcessedAt
                ? new Date(knowledge.lastProcessedAt).toLocaleString()
                : "Never"}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="px-0,5 pt-4 pb-0.5">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<ChatText size={16} />}
              onPress={() => {
                navigate(`/u/${user?.id}/chats/${clone.id}`);
              }}
            >
              Chat
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<PhoneCall size={16} />}
              onPress={() => {
                addToast({
                  title: "Coming soon!",
                  description: "This feature is not available yet.",
                  color: "default",
                });
              }}
            >
              Call
            </Button>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <DotsThree size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="edit" startContent={<Pen size={16} />}>
                Edit Clone
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash size={16} />}
              >
                Delete Clone
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardFooter>
    </Card>
  );
}
