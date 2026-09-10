import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This proxy function runs on the server before every matched request.
// It replaces the deprecated middleware.ts convention (renamed in Next.js v16).
// We check for the session cookie directly instead of calling auth() to avoid
// database/env initialization issues in the proxy context.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // NextAuth / Auth.js stores the session as a signed JWT cookie.
  // Check all possible cookie names (http vs https environments).
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  // If the user is not logged in and tries to access an admin page,
  // redirect them to the login page.
  if (isAdminRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is already logged in and tries to visit the login page,
  // redirect them straight to the admin dashboard.
  if (isLoginPage && sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - uploads folder
     * - api routes (they handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|uploads|api).*)",
  ],
};
