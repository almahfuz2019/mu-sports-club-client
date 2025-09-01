// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// request: NextRequest

export async function middleware() {
  // const token = request.cookies.get("accessToken");
  // const url = request.nextUrl;

  // const privatePaths = ["/dashboard", "/profile", "/settings"];
  // const adminPaths = ["/dashboard"];

  // let isPrivate = false;
  // let isAdmin = false;

  // privatePaths.forEach((path) => {
  //   if (url.pathname.startsWith(path)) {
  //     isPrivate = true;
  //   }
  // });

  // adminPaths.forEach((path) => {
  //   if (url.pathname.startsWith(path)) {
  //     isAdmin = true;
  //   }
  // });

  // if (!token && (isPrivate || isAdmin)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // try {
  //   interface JwtPayload {
  //     user: {
  //       role: string;
  //     };
  //   }

  //   const decoded = await jwtVerify(
  //     token!.value,
  //     new TextEncoder().encode(process.env.JWT_SECRET!)
  //   );

  //   const payload = decoded.payload as unknown as JwtPayload;
  //   if (isAdmin && payload.user.role !== "admin") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } catch (error) {
  //   console.log({ error });
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/profile/:path*",
    // "/settings/:path*",
    // "/admin/:path*",
  ],
};
