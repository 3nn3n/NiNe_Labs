import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*),/sign-up(.*)"]);
const isOrganizationSelectRoute = createRouteMatcher(["/select-organization(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const {userId, orgId} = await auth();

  // If the user is not authenticated and is trying to access a protected route, redirect them to the sign-in page.
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If the user is authenticated and is trying to access the sign-in or sign-up page, redirect them to the home page.
  if (!userId) {
    await auth.protect();
  }

  // If the user is authenticated but has not selected an organization, redirect them to the organization selection page.
  if(isOrganizationSelectRoute(req)) {
    return NextResponse.next();
  }

  

  // If the user is authenticated but has not selected an organization, redirect them to the organization selection page.
  if (userId && !orgId) {
    const selectOrganizationUrl = new URL("/select-organization", req.url);
    return NextResponse.redirect(selectOrganizationUrl);

  }
  return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};



