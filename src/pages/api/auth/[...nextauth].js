// taken from https://blog.dennisokeeffe.com/blog/2020-11-16-nextjs-simple-auth
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const isCorrectCredentials = (credentials) =>
  credentials.username === process.env.NEXTAUTH_USERNAME &&
  credentials.password === process.env.NEXTAUTH_PASSWORD;

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (isCorrectCredentials(credentials)) {
          const user = { id: 1, name: 'Admin' };
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
  jwt: { signingKey: process.env.JWT_SIGNING_PRIVATE_KEY }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options);
