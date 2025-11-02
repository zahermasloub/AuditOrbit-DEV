import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard")

  if (isProtectedPage && !token) {
    // Check localStorage token via header (for client-side navigation)
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
