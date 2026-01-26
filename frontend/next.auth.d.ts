import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        authToken?: string;
        refreshToken?: string;
    }

    interface User {
        id: string;
        authToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        authToken?: string;
        refreshToken?: string;
    }
}
