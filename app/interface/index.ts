import type { Models } from "appwrite";

export type Theme = "dark" | "light" | "system";

export interface UserPreferences {}

export interface UserInfo extends Models.User<UserPreferences> {}

export interface FileInfo {
  _id: string;
  owner: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  name: string;
  banner: string;
  total: number;
}

export interface Setting {
  defaultAlbum: string;
}

export interface Photo {
  name: string;
  url: string;
  type: string;
  size: number;
  bed: string;
  album: string;
}

export interface RegisterFormValue {
  name: string;
  email: string;
  password: string;
}
