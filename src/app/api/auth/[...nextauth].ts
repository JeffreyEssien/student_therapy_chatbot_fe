import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string; // Change to string if needed
  name: string;
  email: string;
}

interface Session {
  user: {
    id: string; // Ensure the id is included in the session user type
    name?: string | null;
    email?: string | null;
  };
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null; // Handle undefined credentials
        }

        // Here you would look up the user in your database
        const user: User = { id: "1", name: "User", email: credentials.email };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/api/auth/signout',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Ensure id is a string
      }
      return session;
    },
  },
});
