import {
  HouseLine,
  Users,
  ChatDots,
  BookBookmark,
  Gear,
} from "@phosphor-icons/react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CloneVerse",
  description: "Make your personal or any celebrity clone using CloneVerse.",
  navItems: [
    {
      label: "",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "",
      href: "/",
    },
  ],
  sidebarNavItems: [
    {
      icon: <HouseLine size={20} />,
      label: "Dashboard",
      href: ``,
    },
    {
      icon: <Users size={20} />,
      label: "My Clones",
      href: "/clones",
    },
    {
      icon: <ChatDots size={20} />,
      label: "Chat History",
      href: "/chats",
    },
    {
      icon: <BookBookmark size={20} />,
      label: "Knowledge Base",
      href: "/clones/knowledgebase",
    },
    {
      icon: <Gear size={20} />,
      label: "Settings",
      href: `/settings`,
    },
  ],
};
