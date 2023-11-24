import { useControllableValue } from "ahooks";
import Dropzone from "react-dropzone";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface AvatarUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AvatarUpload = (props: AvatarUploadProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [avatarUrl, setAvatarUrl] = useControllableValue<string>();

  return (
    <Dropzone>
      {({ getRootProps, getInputProps }) => (
        <div className="flex">
          <input {...getInputProps()} />
          <Avatar {...getRootProps()}>
            <AvatarImage src={avatarUrl} />
          </Avatar>
          <div>
            <Button {...getRootProps()}>更新头像</Button>
            <p>可以拖动图片到左边头像区域完成上传</p>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
