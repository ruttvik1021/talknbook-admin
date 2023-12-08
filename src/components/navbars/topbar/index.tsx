"use client";

import { Button } from "@/components/ui/button";
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
import { routes } from "@/utils/urls";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NavLink from "../navlink";

const TopBar = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900 text-white">
        <SheetHeader>
          <SheetTitle>
            <Label className="flex justify-center font-semibold text-3xl mt-5 text-white">
              Talk N Book
            </Label>
          </SheetTitle>
          <SheetDescription className="text-white">Admin</SheetDescription>
        </SheetHeader>
        <div className="pl-5 text-left">
          {routes.map((item: navRoute, index: number) => (
            <div className="my-5" key={`${item.href}-${index}`}>
              <NavLink label={item.label} href={item.href} icon={item.icon} />
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => {
                Cookies.remove("token");
                router.push("/");
              }}
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TopBar;
