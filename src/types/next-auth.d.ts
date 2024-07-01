import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: {
            id: string;
            name: string;
            firstName: string;
            lastName: string;
            email: string;
            image: string;
            cityId: string;
            role: string;
            accessToken: string;
        };
    }
}