import { signinuser } from "@/serveses/auth.serveses";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

interface decodedToken {
  id: string;
  name: string;
  role: string;
}

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const data = await signinuser(credentials);
        console.log("dataAuth", data);
        if (data.message === "success") {
          const decodedToken: decodedToken = jwtDecode(data.token);
          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message || "eroor");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        ((token.user = user.user), (token.tokend = user.token));
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user = token.user;
      }
      return session;
    },
  },
};
