"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navRoute } from "@/utils/constants";
import NavLink from "../navlink";
import Cookies from "js-cookie";
import { routes } from "@/utils/urls";

const TopBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900">
        <SheetHeader>
          <SheetTitle>
            <Label className="flex justify-center font-semibold text-3xl mt-5">
              Talk N Book
            </Label>
          </SheetTitle>
          <SheetDescription>Admin</SheetDescription>
        </SheetHeader>
        <div className="pl-5">
          {routes.map((item: navRoute, index: number) => (
            <div className="my-5" key={`${item.href}-${index}`}>
              <NavLink label={item.label} href={item.href} icon={item.icon} />
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => Cookies.remove("token")}>Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TopBar;
