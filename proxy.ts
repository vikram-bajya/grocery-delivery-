import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  const publicRoute = [
    "/login",
    "/signup",
    "/about",
    "register",
    "/api/auth",

  ];
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
