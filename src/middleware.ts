import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { ROLES } from "./utils/constants";

const protectedRoutes = ["/dashboard"];

export default async function middlerware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const secret = process.env.JWT_SECRET!;
  const signature = new TextEncoder().encode(secret);

  try {
    const decoded = await jose.jwtVerify(token, signature);
    const isSuperAdmin = decoded.payload?.role === ROLES.SUPERADMIN;
    if (!isSuperAdmin && protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }
    return;
  } catch (error) {
    console.log(error);
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }
  }
}
