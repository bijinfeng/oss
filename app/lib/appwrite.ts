import { Client, Account, Avatars, Storage, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65221293d72706770b63");

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
};