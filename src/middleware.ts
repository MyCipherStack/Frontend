// middleware function  And Confiq 
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {


  const token = req.cookies.get("refreshToken")
  // const token = req.cookies.get("refreshToken")
  const accessToken = req.cookies.get("accessToken")
  const url = req.nextUrl.pathname
  console.log(token, "middleware");


  const publicPath=["/","/login","/problems"]

  if ( url.startsWith("/login") && token) {

    return NextResponse.redirect(new URL("/", req.url));
  }

  if(publicPath.includes(url)){

    return NextResponse.next();

  }




  // if (!url.startsWith("/admin") && token) {
  //   return NextResponse.next();
  // }
  if (url.startsWith("/admin/") && !accessToken && !token) {
    console.log("start with /admin with out token");

    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (url.startsWith("/admin/") && accessToken) {
    console.log("start with /admin with token");
    // return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}



//Configure where the middleware should run
export const config = {
  matcher: [
    "/login", "/Profile", "/admin/:path*"  ,
    "/problems" , "/Arena"     // exact path
  ],
};
