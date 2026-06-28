import { NextRequest, NextResponse } from "next/server";
import { getTokenCookie, getUserInfoCookie } from "./lib/cookies";
const publicRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenCookie();
  const user = await getUserInfoCookie();
  const isPublicRoute =
    pathname === "/" ||
    publicRoutes.some((route) => pathname.startsWith(route));

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url)); //changes both page and url
  }
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (token && user) {
    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/register", "/", "/dashboard", "/login", "/admin/:path*"],
};
