import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Form, { FormInstance } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { forgetPassword } from "@/lib/request";
import { ForgetPasswordLayout } from "@/components/forget-password-layout";

interface FormValue {
  email: string;
  password: string;
}

export const Component = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    const value = formRef.current!.getValues();

    await forgetPassword(value.email);
    toast({
      description:
        "If you registered using your email and password, you will receive a password reset email.",
    });
    navigate("/login");
  };

  return (
    <ForgetPasswordLayout
      heading="Reset Your Password"
      subheading="Type in your email and we'll send you a link to reset your password"
    >
      <Form<FormValue> form={formRef} className="py-4">
        <Form.Item name="email" label="Email address" required>
          <Input placeholder="your@email.com" />
        </Form.Item>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Send Reset Email
        </Button>
      </Form>
    </ForgetPasswordLayout>
  );
};

Component.displayName = "ForgetPasswordPage";
