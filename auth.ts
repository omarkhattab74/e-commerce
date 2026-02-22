import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },

    providers: [

        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const payload = await response.json()
                console.log(payload);

                if (payload.message === "success") {
                    return {
                        id: payload.email,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error("Invalid Email Or Password")
                }


            }
        })

    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        }
    }
}