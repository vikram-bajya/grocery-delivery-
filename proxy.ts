import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  const publicRoute = ["/login", "/signup", "/about", "register", "/api/auth"];
  if (publicRoute.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  const tocken = await getToken({ req, secret: process.env.AUTH_SECRET! });
  console.log(tocken);

  if (!tocken) {
    const loginurl = new NextURL("/login", req.url);
    loginurl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginurl);
  }
  const role = tocken.role;
  if (pathname.startsWith("/user") && role !== "user") {
    const unauthorizedUrl = new NextURL("/unauthorized", req.url);
    return NextResponse.redirect(unauthorizedUrl);
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    const unauthorizedUrl = new NextURL("/unauthorized", req.url);
    return NextResponse.redirect(unauthorizedUrl);
  }
  if (pathname.startsWith("/deliverBoy") && role !== "deliverBoy") {
    const unauthorizedUrl = new NextURL("/unauthorized", req.url);
    return NextResponse.redirect(unauthorizedUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher:
    "/((?!api/user/stripe/webhook|_next/static|_next/image|favicon.ico).*)",
};
