import {
    loginService,
    LoginServiceInput,
} from "@/services/login/login.service";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const loginServiceInput: LoginServiceInput = {
                    email: credentials?.email || "",
                    password: credentials?.password || "",
                };

                try {
                    const result = await loginService(loginServiceInput);

                    const authorizedUser: User = {
                        id: crypto.randomUUID(),
                        authToken: result.authToken,
                        refreshToken: result.refreshToken,
                    };

                    return authorizedUser;
                } catch (error) {
                    const message = `Error during user login: ${(error as Error).message}`;
                    console.log(message);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.authToken = user.authToken;
                token.refreshToken = user.refreshToken;
            }
            // Logica de refresh, validando se authToken está expirado, caso esteja, chama serviço de refresh
            return token;
        },
        async session({ session, token }) {
            session.authToken = token.authToken;
            session.refreshToken = token.refreshToken;
            return session;
        },
    },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
