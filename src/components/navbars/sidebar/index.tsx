"use client";

import { navRoute } from "@/utils/constants";
import { routes } from "@/utils/urls";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import NavLink from "../navlink";
const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={`bg-gray-900 text-white min-h-screen fixed left-0 w-1/6`}>
      <p className="flex justify-center font-semibold md:text-xl mt-5">
        Talk N Book
      </p>
      <p className="flex justify-around font-extralight text-sm">Admin</p>
      <div className="pl-5">
        {routes.map((item: navRoute, index: number) => (
          <div className="my-5" key={`${item.href}-${index}`}>
            <NavLink
              label={item.label}
              href={item.href}
              subRoutes={item.subRoutes}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          Cookies.remove("token");
          router.push("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
