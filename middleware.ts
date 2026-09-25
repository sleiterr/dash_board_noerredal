import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/utils/auth/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login
  if (pathname === "/login") {
    if (token) {
      try {
        await verifySessionToken(token);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verifySessionToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// This configuration specifies which paths the middleware should apply to. In this case, it applies to all paths under "/dashboard" and the "/login" path.
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
