import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_REDIRECT_AFTER_LOGIN, SESSION_COOKIE } from "@/lib/constants";

const AUTH_PATHS = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;
  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (!hasSession && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_AFTER_LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/offers/:path*", "/tasks/:path*", "/wallet/:path*", "/profile/:path*"],
};
