import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { CreditCard, Gear, List, SignOut } from "@phosphor-icons/react";
import { Logo, SearchIcon } from "./icons";
import { useLayoutStore } from "@/store/useSidebarStore";
import Avatar from "boring-avatars";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeSwitch } from "./theme-switch";

interface TopNavbarProps {
  onMenuToggle: () => void;
}

export function TopNavbar({ onMenuToggle }: TopNavbarProps) {
  const isCollapsed = useLayoutStore((s) => s.isSidebarCollapsed);
  const user = useAuthStore((state) => state.user);
  return (
    <Navbar
      maxWidth="full"
      className={`border-b border-divider ${isCollapsed ? "lg:pl-20" : "lg:pl-64"} transition-all duration-300`}
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarContent className="lg:hidden">
        <List
          onClick={onMenuToggle}
          className="hover:bg-default-100 cursor-pointer"
        />
      </NavbarContent>

      <NavbarBrand>
        <Logo size={32} />
        <p className="font-bold text-inherit ml-2">CloneVerse</p>
        <span className="text-tiny text-default-500 ml-2 hidden sm:inline">
          AI Clone Creation Platform
        </span>
      </NavbarBrand>

      <NavbarContent justify="center" className="flex-grow">
        <Input
          classNames={{
            base: "max-w-xl h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search your clones..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <ThemeSwitch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="cursor-pointer">
              <Avatar
                size={32}
                name={`${user?.firstName} ${user?.lastName}`}
                variant="beam"
                colors={["#7828c8", "#006FEE"]}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-small text-default-500">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" startContent={<Gear />}>
              Account Settings
            </DropdownItem>
            <DropdownItem key="subscription" startContent={<CreditCard />}>
              Subscription
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<SignOut />}
              onPress={() => useAuthStore.getState().clearAuth()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
