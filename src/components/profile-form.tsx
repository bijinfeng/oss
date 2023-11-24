import { useRef } from "react";
import Form from "@/components/form";
import type { FormInstance } from "@/components/form";
import { AvatarUpload } from "@/components/avatar-upload";
// import { getDefaultAvatar } from "@/lib/utils";

export const ProfileForm = () => {
  const formRef = useRef<FormInstance>(null);

  return (
    <Form form={formRef}>
      <Form.Item name="avatar" label="头像">
        <AvatarUpload />
      </Form.Item>
    </Form>
  );
};
