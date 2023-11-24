export type Theme = "dark" | "light" | "system";

export interface UserPreferences {}

export interface UserInfo {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
}

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
  username: string;
  email: string;
  password: string;
}
