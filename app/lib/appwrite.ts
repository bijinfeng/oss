import { Client, Account, Avatars, Storage, Databases } from "appwrite";

export const client = new Client();

client.setEndpoint(ENV.APPWRITE_END_POINT).setProject(ENV.APPWRITE_PROJECT);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export { ID, Query } from "appwrite";

export const api = {
  getAccount: () => account.get(),
  createJWT: () => account.createJWT().then((res) => res.jwt),
  setJWT: (jwt: string) => client.setJWT(jwt),
  createEmailSession: (email: string, password: string) =>
    account.createEmailSession(email, password),
  getAccountAvatar: (name?: string) => avatars.getInitials(name),
  createGithubOAuthSession: (successUrl: string, failureUrl: string) =>
    account.createOAuth2Session("github", successUrl, failureUrl),
  createGoogleOAuthSession: () => account.createOAuth2Session("google"),
};
