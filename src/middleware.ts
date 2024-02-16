import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (
      !auth.userId &&
      !auth.sessionClaims?.sub &&
      req.nextUrl.pathname !== '/'
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
