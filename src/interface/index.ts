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

export interface UploadFileFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  size: number;
  url: string;
  width: number;
}

export interface UploadFile {
  id: number;
  mime: string;
  name: string;
  size: string;
  url: string;
  width: number;
  height: number;
  ext: string;
  formats: {
    large: UploadFileFormat;
    medium: UploadFileFormat;
    small: UploadFileFormat;
    thumbnail: UploadFileFormat;
  };
}
