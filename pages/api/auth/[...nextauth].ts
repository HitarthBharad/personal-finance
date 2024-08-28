import { ObjectId } from "mongodb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { IUser, IToken, ISession, ICredentials } from "@/utils/types/next-auth"; // adjust the import path as necessary
import dbConnectorPromise from "@/utils/dbConnector"

import { hash, compare } from "bcryptjs";

async function hashPassword(password: string) {
	// hash returns a promise (12 cycles)
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}


async function verifyPassword(password: string, hashedPassword: string) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}

export const authOptions = {
    session: { strategy: "jwt", jwt: true, maxAge: 2 * 60 * 60 },
    secret: process.env.SECRET,
    callbacks: {
        jwt: async ({ token, user }: { token: IToken; user?: IUser }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }: { session: ISession; token?: IToken }) => {
            session.user = token?.user;
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials: ICredentials) {
                const client = await dbConnectorPromise;
                const projectDB = client.db(process.env.DB_NAME);

                const username = credentials.username.toLowerCase().trim();

                const user = await projectDB
                    .collection("users")
                    .findOne({ username });

                if (!user) throw new Error("Invalid Username or Password!");

                // const validPassword = await verifyPassword(
				// 	credentials.password,
				// 	user.password
				// );

                // if (!validPassword) {
                //     throw new Error("Incorrect Username or Password !");
                // }

                return {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneCode: user.phoneCode,
                    contactNumber: user.contactNumber,
                    email: user.email
                }
            }
        })
    ]
};

export default NextAuth(authOptions);