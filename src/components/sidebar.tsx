import {
  Button,
  Badge,
  Progress,
  Tooltip,
  Drawer,
  DrawerContent,
} from "@heroui/react";
import {
  Plus,
  Headset,
  CaretDoubleLeft,
  CaretDoubleRight,
} from "@phosphor-icons/react";
import { useLayoutStore } from "@/store/useSidebarStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { siteConfig } from "@/config/site";

interface SidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  isCollapsed,
  isMobile,
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = useLocation().pathname;
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar);

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-6 gap-1">
        {!isCollapsed && (
          <Button
            color="primary"
            className="w-full grow"
            startContent={<Plus />}
            onPress={() => navigate(`/u/${user?.id}/clones/create`)}
          >
            Create Clone
          </Button>
        )}
        {isCollapsed && (
          <Button isIconOnly color="primary" aria-label="Create Clone">
            <Plus />
          </Button>
        )}
        {!isCollapsed && (
          <div
            onClick={toggleSidebar}
            className=" justify-end flex cursor-pointer p-2 rounded-lg hover:bg-default-100"
          >
            <CaretDoubleLeft weight="thin" />
          </div>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {siteConfig.sidebarNavItems.map((item) => {
            const isActive = pathname === `/u/${user?.id}${item.href}`;
            return (
              <li key={item.label}>
                {!isCollapsed && (
                  <Button
                    variant="flat"
                    color={isActive ? "primary" : "default"}
                    className={`w-full justify-start`}
                    startContent={item.icon}
                    onPress={() => navigate(`/u/${user?.id}${item.href}`)}
                  >
                    {item.label}
                  </Button>
                )}
                {isCollapsed && (
                  <Tooltip content={item.label}>
                    <Button
                      variant="flat"
                      isIconOnly
                      color={isActive ? "primary" : "default"}
                      onPress={() => navigate(`/u/${user?.id}${item.href}`)}
                    >
                      {item.icon}
                    </Button>
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg bg-content2">
            <h4 className="text-sm font-semibold mb-2">Usage Stats</h4>
            {/* <UsageChart /> */}
            <Progress
              aria-label="Usage progress"
              value={45}
              className="mt-2"
              size="sm"
            />
          </div>
          <Badge content={user?.plan} color="primary" size="sm">
            Current Plan
          </Badge>
        </div>
      )}

      {isCollapsed && (
        <div
          onClick={toggleSidebar}
          className="justify-start flex w-fit cursor-pointer p-2 rounded-lg hover:bg-default-100 mb-1"
        >
          <CaretDoubleRight weight="thin" />
        </div>
      )}
      {!isCollapsed && (
        <Button
          variant="flat"
          color="default"
          className={`mt-auto justify-start`}
          startContent={<Headset />}
        >
          "Help & Support"
        </Button>
      )}
      {isCollapsed && (
        <Button variant="flat" color="default" isIconOnly>
          <Headset />
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <div
      className={`h-screen fixed left-0 top-0 z-40 bg-content1 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarContent />
    </div>
  );
}
