import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
        {
          headers: {
            Cookie: cookieHeader,
          },
        }
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
        {
          headers: {
            Cookie: cookieHeader,
          },
        }
      );

      if (response.ok) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    } catch {
      // User is not authenticated, allow access to public routes
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
