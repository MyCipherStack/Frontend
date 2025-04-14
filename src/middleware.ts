// middleware function  And Confiq 
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {


  const token = req.cookies.get("accessToken")
  const adminToken = req.cookies.get("adminAccessToken")
  const url=req.nextUrl.pathname
console.log(token,"middleware");
if ( !url.startsWith("/admin")  && url.startsWith("/Login") && token) {
  return NextResponse.redirect(new URL("/Home", req.url));
}
if ( !url.startsWith("/admin") && token) {
  return NextResponse.next();
}
  if(url.startsWith("/admin/") &&  !adminToken){
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if(url.startsWith("/admin") &&  adminToken){
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}



//Configure where the middleware should run
export const config = {
  matcher: [
    "/Login","/Profile" ,"/admin:path*"         // exact path
  ],
};
