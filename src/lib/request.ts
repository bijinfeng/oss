import request, { TOEKN_KEY } from "@/lib/http";
import type { RegisterFormValue, UserInfo } from "@/interface";

type UserRes = { jwt: string; user: UserInfo };

// 登录
export const login = async (email: string, password: string) => {
  const res = await request.post<UserRes>("/auth/local", {
    identifier: email,
    password,
  });

  localStorage.setItem(TOEKN_KEY, res.data.jwt);

  return res.data;
};

// 注册
export const register = async (data: RegisterFormValue) => {
  const res = await request.post<{ user: UserInfo }>(
    "/auth/local/register",
    data
  );
  return res.data;
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  const res = await request.get<UserInfo>("/users/me");
  return res.data;
};

// 登出
export const logout = () => {
  localStorage.removeItem(TOEKN_KEY);
};

// 忘记密码
export const forgetPassword = async (email: string) => {
  const res = await request.post<{ ok: true }>("/auth/forgot-password", {
    email,
  });
  return res.data;
};

// 重置密码
export const resetPassword = async (data: {
  password: string;
  passwordConfirmation: string;
  code: string;
}) => {
  const res = await request.post<UserRes>("/auth/reset-password", data);

  localStorage.setItem(TOEKN_KEY, res.data.jwt);

  return res.data;
};

export const authProviderCallback = async (
  provider: string,
  search: string
) => {
  const res = await request.get<UserRes>(`/auth/${provider}/callback${search}`);

  localStorage.setItem(TOEKN_KEY, res.data.jwt);

  return res.data;
};

// 上传图片
export const uploadImage = async (file: File | Blob) => {
  const form = new FormData();
  form.append("files", file);

  const res = await request.post("/upload", form);
  console.log(res);
};
