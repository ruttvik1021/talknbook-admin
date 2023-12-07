import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { ROLES } from "./utils/constants";

const protectedRoutes = ["/dashboard", "/users", "/master-data"];

export default async function middlerware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const secret = process.env.JWT_SECRET!;
  const signature = new TextEncoder().encode(secret);

  try {
    const decoded = await jose.jwtVerify(token, signature);
    const isSuperAdmin = decoded.payload?.role === ROLES.SUPERADMIN;
    const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
    const loginURl = new URL("/login", req.nextUrl.origin);
    if (!isSuperAdmin) {
      return NextResponse.redirect(loginURl.toString());
    }
    if (
      (isSuperAdmin && req.nextUrl.pathname === "/login") ||
      (isSuperAdmin && !protectedRoutes.includes(req.nextUrl.pathname))
    ) {
      return NextResponse.redirect(dashboardUrl.toString());
    }
    return;
  } catch (error) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }
  }
}
