// middleware function  And Confiq 
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")
console.log(token,"middleware");
  if (token) {
    return NextResponse.redirect(new URL("/Home", req.url));
  }

  return NextResponse.next();
}



//Configure where the middleware should run
export const config = {
  matcher: [
    "/profile",           // exact path
    // "/dashboard/:path*",  // wildcard path (e.g., /dashboard/settings)
  ],
};
