"use client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { ROLES } from "./utils/constants";

const protectedRoutes = ["/admin", "/admin/users"];

export default async function middlerware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const secret = process.env.JWT_SECRET || "cnV0dHZpa0AyMQ==";
  const signature = new TextEncoder().encode(secret);
  try {
    const dashboardUrl = new URL("/admin", req.nextUrl.origin);
    const loginURl = new URL("/login", req.nextUrl.origin);
    const decoded = await jose.jwtVerify(token, signature);
    const isSuperAdmin = decoded.payload?.role === ROLES.SUPERADMIN;
    4;
    if (!isSuperAdmin) {
      return NextResponse.redirect(loginURl.toString());
    }
    if (
      (isSuperAdmin && req.nextUrl.pathname === "/login") ||
      (isSuperAdmin && req.nextUrl.pathname === "/")
    ) {
      return NextResponse.redirect(dashboardUrl.toString());
    }
    return;
  } catch (error) {
    const loginURl = new URL("/login", req.nextUrl.origin);
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(loginURl.toString());
    }
  }
}
