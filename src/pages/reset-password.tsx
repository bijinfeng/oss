import { useRef } from "react";

import Form, { FormInstance } from "@/components/form";
import { ForgetPasswordLayout } from "@/components/forget-password-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { resetPassword } from "@/lib/request";

type FormValue = {
  password: string;
  passwordConfirmation: string;
};

export const Component = () => {
  const formRef = useRef<FormInstance<FormValue>>(null);

  const handleSubmit = async () => {
    // const data = await resetPassword({ ...value, code });
  };

  return (
    <ForgetPasswordLayout
      heading="Reset Your Password"
      subheading="Type in a new secure password and press save to update your password"
    >
      <Form<FormValue> form={formRef} className="py-4">
        <Form.Item name="password" label="Password" required>
          <Input placeholder="Your password" type="password" />
        </Form.Item>
        <Form.Item name="passwordConfirmation" label="Password Confirmation">
          <Input placeholder="Your confirmation password" type="password" />
        </Form.Item>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Save New Password
        </Button>
      </Form>
    </ForgetPasswordLayout>
  );
};

Component.displayName = "ResetPasswordPage";
