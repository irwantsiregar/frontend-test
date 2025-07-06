import environment from "@/config/environtment";
import { JWTExtended } from "@/types/Auth";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/inventory", request.url));
    }
  }
  
  console.log("Pathname: ", pathname);
  // Check if not login, then redirect to login page
  if (!token) {
    const url = new URL("/login", request.url);

    url.searchParams.set("callbackUrl", encodeURI(request.url));

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/inventory/:path*",
    "/users/:path*",
  ],
};
