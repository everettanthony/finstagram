import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'Name', type: 'text', placeholder: 'tonyb' }, 
                password: { label: 'Password', type: 'password' } ,
                email: { label: 'Email', type: 'email' }
            },
            async authorize(credentials) {
                // empty form validation
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                // fetch user
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // existing user validation
                if (!user) return null;

                // passwords match validation
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordsMatch) return null;

                // return user if everything checks out
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            // update user
            if (trigger === 'update' && session?.address) {
                token.address = session.address;
            }

            // pass in user id and any new fields to token
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    address: user.address
                }
            }

            // update the user in the mongodb database
            const newUser = await prisma.user.update({
                where: {
                    id: token.id
                },
                data: {
                    address: token.address
                }
            });

            return token;
        },
        async session({ session, token, user }) {
            // pass in user id and any new fields to session
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    address: token.address
                }
            }
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };