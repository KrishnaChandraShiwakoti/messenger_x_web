import { NextRequest, NextResponse } from "next/server";
import { getTokenCookie, getUserInfoCookie } from "./lib/cookies";
const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getTokenCookie();
  const user = await getUserInfoCookie();
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url)); //changes both page and url
  }
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/register", "/", "/dashboard", "/login"],
};
