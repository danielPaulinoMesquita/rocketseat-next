import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import {Collection, Create} from 'faunadb';

export const authOptions = {
    // Configure one or more authentication providers
    // Dont forget to install or add next-auth in package.json
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
        // ...add more providers here
    ],
    callbacks: {
        async signIn({user, account, profile}){
            console.log('VIEW USER: ', user);

            const {email} = user;

            try {
                await fauna.query(
                    Create(
                        Collection('users'),
                        {data: {email}}
                    ))

                return true
            }catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}
export default NextAuth(authOptions)