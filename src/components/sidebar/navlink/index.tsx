"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useRouter, usePathname } from "next/navigation";

type INavLink = {
  label: string;
  href: string;
  icon?: string;
};
const NavLink = (props: INavLink) => {
  const { label, href, icon } = props;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex gap-3 justify-start items-center">
      {/* <Avatar className="cursor-pointer" onClick={() => router.push(href)}>
        <AvatarImage src={icon} alt={label} />
        <AvatarFallback>{label}</AvatarFallback>
      </Avatar> */}
      <Label
        className={`cursor-pointer hover:border-b-2 border-blue-300 ${
          pathname === href ? "text-blue-300" : ""
        }`}
        onClick={() => router.push(href)}
      >
        {label}
      </Label>
    </div>
  );
};

export default NavLink;
