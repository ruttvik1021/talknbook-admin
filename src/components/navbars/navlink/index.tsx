"use client";

import { Label } from "@/components/ui/label";
import { navRoute } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

const NavLink = (props: navRoute) => {
  const { label, href, subRoutes } = props;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex gap-3 justify-start items-center">
        <Label
          className={`cursor-pointer hover:border-b-2 border-blue-300 ${
            subRoutes && subRoutes.length
              ? null
              : pathname === href
              ? "text-blue-300"
              : ""
          }`}
          onClick={() => router.push(href)}
        >
          {label}
        </Label>
      </div>
      {subRoutes && subRoutes.length
        ? subRoutes.map((subRoute: any, index: number) => (
            <Fragment key={subRoute.label}>
              <div className="mt-3">
                <Label
                  className={`cursor-pointer hover:border-b-2 border-blue-300 ml-3 ${
                    pathname === subRoute.href ? "text-blue-300" : ""
                  }`}
                  onClick={() => router.push(subRoute.href)}
                >
                  {subRoute.label}
                </Label>
              </div>
            </Fragment>
          ))
        : null}
    </>
  );
};

export default NavLink;
