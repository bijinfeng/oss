import { useNavigate } from "react-router-dom";

import { LoginForm, type FormValue } from "@/components/login-form";
import { AccountLayout } from "@/components/account-layout";
import { login } from "@/lib/request";

export function Component() {
  const navigate = useNavigate();

  // 登录成功后导航到首页
  const handleSubmit = async (value: FormValue) => {
    await login(value.email, value.password);
    navigate("/");
  };

  return (
    <AccountLayout
      title="Login to your account"
      flotLink={{ name: "Sign up", link: "/register" }}
    >
      <LoginForm onSubmit={handleSubmit} />
    </AccountLayout>
  );
}

Component.displayName = "LoginPage";
