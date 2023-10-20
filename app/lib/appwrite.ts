import { Client, Account, Avatars, Storage, Databases } from "appwrite";
import { v4 as uuid } from "uuid";

export const client = new Client();

client.setEndpoint(ENV.APPWRITE_END_POINT).setProject(ENV.APPWRITE_PROJECT);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export const api = {
  getAccount: () => account.get(),
  createAccount: (email: string, password: string, name: string) => {
    return account.create(uuid(), email, password, name);
  },
  createJWT: () => account.createJWT().then((res) => res.jwt),
  setJWT: (jwt: string) => client.setJWT(jwt),
  createEmailSession: (email: string, password: string) =>
    account.createEmailSession(email, password),
  getAccountAvatar: (name?: string) => avatars.getInitials(name),
  createGithubOAuthSession: (successUrl: string, failureUrl: string) =>
    account.createOAuth2Session("github", successUrl, failureUrl),
  createGoogleOAuthSession: () => account.createOAuth2Session("google"),
};

export type { AppwriteException } from "appwrite";
