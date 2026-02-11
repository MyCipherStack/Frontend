// middleware function  And Confiq 
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {


  const token = req.cookies.get("refreshToken")
  const accessToken = req.cookies.get("accessToken")
  const url = req.nextUrl.pathname
 
  
  const publicPath = ["/", "/login", "/problems"]

  if (url.startsWith("/login") && token) {

    return NextResponse.redirect(new URL("/", req.url));
  }

  if (publicPath.includes(url)) {

    return NextResponse.next();

  }




  // if (!url.startsWith("/admin") && token) {
  //   return NextResponse.next();
  // }
  if (url.startsWith("/admin/login") && accessToken) {


    return NextResponse.redirect(new URL("/admin/dashboard", req.url));

  }
  if (url.startsWith("/admin/login") && !accessToken) {


    return NextResponse.next();


  }
  if (url.startsWith("/admin/") && !accessToken && !token) {
 

    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (url.startsWith("/admin/") && accessToken) {
  
    // return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}



//Configure where the middleware should run
export const config = {
  matcher: [
    "/login", "/Profile", "/admin/:path*",
    "/problems", "/Arena", "/admin"    // exact path
  ],
};
