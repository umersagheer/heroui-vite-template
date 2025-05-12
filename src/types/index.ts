import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  isverified: boolean;
  plan: "FREE" | "PRO";
};
