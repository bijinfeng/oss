import { useRef } from "react";
import Form from "@/components/form";
import type { FormInstance } from "@/components/form";
import { AvatarUpload } from "@/components/avatar-upload";
import { getDefaultAvatar } from "@/lib/utils";

interface FormValue {
  avatar: string;
}

export const ProfileForm = () => {
  const formRef = useRef<FormInstance<FormValue>>(null);

  return (
    <Form<FormValue> form={formRef} defaultValues={{ avatar: getDefaultAvatar("kebai") }}>
      <Form.Item name="avatar" label="头像">
        <AvatarUpload />
      </Form.Item>
    </Form>
  );
};
