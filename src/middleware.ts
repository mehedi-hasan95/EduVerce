import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/group(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  const baseHost = process.env.BASE_URL;
  const host = req.headers.get("host");
  const reqPath = req.nextUrl.pathname;
  const origin = req.nextUrl.origin;
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  if (!baseHost?.includes(host as string) && reqPath.includes("/group")) {
    const response = await fetch(`${origin}/api/domain?host=${host}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 200 && data) {
      return NextResponse.redirect(
        new URL(reqPath, `https://${data.domain}${reqPath}`)
      );
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
