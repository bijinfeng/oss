import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import { AccountLayout } from "@/components/account-layout";
import { login } from "@/lib/request";
import Form, { FormInstance } from "@/components/form";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormValue {
  email: string;
  password: string;
}

export function Component() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormInstance<FormValue>>(null);

  // 登录成功后导航到首页
  const handleSubmit = async () => {
    const validated = await formRef.current?.trigger();
    if (!validated) return;

    const value = formRef.current!.getValues();
    setLoading(true);
    try {
      await login(value.email, value.password);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout
      title="Login to your account"
      flotLink={{ name: "Sign up", link: "/register" }}
    >
      <Form<FormValue> form={formRef}>
        <Form.Item name="email" label="Email address" required>
          <Input placeholder="your@email.com" />
        </Form.Item>
        <Form.Item
          required
          name="password"
          label="Password"
          labelClassName="flex items-center justify-between"
          labelSuffix={
            <Link className="text-xs underline" to="/forget-password">
              I forget password
            </Link>
          }
        >
          <Input placeholder="Your password" type="password" />
        </Form.Item>

        <Button type="submit" onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading && <Loading size={18} className="mr-1" />}
          Sign in
        </Button>
      </Form>
    </AccountLayout>
  );
}

Component.displayName = "LoginPage";
