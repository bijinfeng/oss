import request, { TOEKN_KEY } from "~/lib/http";
import type { RegisterFormValue, UserInfo } from "~/interface";

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
  const res = await request.post<UserRes>("/auth/local/register", data);

  localStorage.setItem(TOEKN_KEY, res.data.jwt);

  return res.data;
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  console.log(222222);
  const res = await request.get<UserInfo>("/users/me");
  console.log(res.data);
  return res.data;
};
