import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure runtime
export const runtime = "nodejs";

// Define protected admin routes
const PROTECTED_ADMIN_ROUTES = ["/admin"];
const PUBLIC_ROUTES = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If it's not a protected admin route, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // If it's a public route within admin, continue
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get the admin token from cookies
  const token = request.cookies.get("admin-token")?.value;

  console.log(
    "Middleware - Path:",
    pathname,
    "Token:",
    token ? "exists" : "missing"
  );

  if (!token) {
    // Redirect to login if no token
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    // Simple token validation - decode without verification for now
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error("Token expired");
    }

    console.log("Token validated successfully");
    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    console.log("Token validation failed:", error);
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
    // Clear the invalid token
    response.cookies.delete("admin-token");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
