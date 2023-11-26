import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export function fileSizeFormatter(value = 0): string {
  if (!value) return "0 Bytes";
  const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const index = Math.floor(Math.log(value) / Math.log(1024));
  const size = value / 1024 ** index;
  const sizeString = size.toFixed(2); // 保留的小数位数
  return sizeString + " " + unitArr[index];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocal = (key: string, value: any) => {
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  canUseDOM && localStorage.setItem(key, value);
};

export const getLocal = (key: string) => {
  return canUseDOM ? localStorage.getItem(key) : undefined;
};

export const isUrl = (url: string): boolean =>
  url.startsWith("http://") || url.startsWith("https://");

export const isUrlEncode = (url: string): boolean => {
  url = url || "";
  try {
    // the whole url encode or decode shold not use encodeURIComponent or decodeURIComponent
    return url !== decodeURI(url);
  } catch (e) {
    // if some error caught, try to let it go
    return true;
  }
};

export const handleUrlEncode = (url: string): string => {
  if (!isUrlEncode(url)) {
    url = encodeURI(url);
  }
  return url;
};

export const getDefaultAvatar = (username: string) => {
  return `https://source.boringavatars.com/beam/120/${username}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
};

export function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString: string;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
