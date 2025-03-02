import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  // Check if the user is authenticated
  const isLoggedIn = req.auth ? true : false;
  // Check if the user is on the login page
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  // Check if the user is on a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/me");

  //Redirect the user to the login page if they are not logged in and trying to access a protected route
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Redirect the authenticated user to the protected route if they are trying to access the login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/me", req.url));
  }

  return NextResponse.next();
});

// Middleware configuration
export const config = {
  matcher: ["/me/:path*", "/login"],
};
