import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // NextAuth automatically handles this
    },
    {
        callbacks: {
            authorized: ({ req, token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/resultado/:path*"],
};
