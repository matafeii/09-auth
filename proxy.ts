import { NextResponse, type NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

const startsWithRoute = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname.startsWith(route));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);

  if (!isAuthenticated && startsWithRoute(pathname, privateRoutes)) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && startsWithRoute(pathname, authRoutes)) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
