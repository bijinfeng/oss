import { useState, useRef } from "react";

import { AccountLayout } from "@/components/account-layout";
import { register } from "@/lib/request";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Form, { FormInstance } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormValue {
  username: string;
  email: string;
  password: string;
}

export function Component() {
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const validated = await formRef.current?.trigger();
    if (!validated) return;

    const value = formRef.current!.getValues();
    setLoading(true);
    try {
      await register(value);
      setRegistered(true);
    } finally {
      setLoading(false);
    }
  };

  const renderSuccessAlert = () => (
    <Alert variant="success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <AlertTitle className="text-sm">Check your email to confirm</AlertTitle>
      <AlertDescription className="text-xs">
        You&apos;ve successfully signed up. Please check your email to confirm
        your account before signing in to the Supabase dashboard
      </AlertDescription>
    </Alert>
  );

  return (
    <AccountLayout
      title="Create new account"
      flotLink={{ name: "Login", link: "/login" }}
    >
      {registered ? (
        renderSuccessAlert()
      ) : (
        <Form<FormValue> form={formRef}>
          <Form.Item name="username" label="Name" required>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="email" label="Email address" required>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item required name="password" label="Password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full"
            loading={loading}
          >
            Create new account
          </Button>
        </Form>
      )}
    </AccountLayout>
  );
}

Component.displayName = "RegisterPage";
