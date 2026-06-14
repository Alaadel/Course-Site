import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    // if path is admin: user must have admin role in db
    // else: redirect to /

    // if path is account or orders: user must be logged in
    // else: redirect to /login
}
 
export const config = {
//   matcher: ['/admin', '/account', '/orders'],
}