import { useControllableValue } from "ahooks";
import Dropzone from "react-dropzone";
import { ArrowUpFromLine } from 'lucide-react';

import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface AvatarUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const AvatarUpload = (props: AvatarUploadProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [avatarUrl, setAvatarUrl] = useControllableValue<string>(props);

  return (
    <Dropzone>
      {({ getRootProps, getInputProps }) => (
        <div className="flex">
          <input {...getInputProps()} />
          <Avatar {...getRootProps()} className="w-20 h-20 cursor-pointer relative group">
            <AvatarImage src={avatarUrl} />
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black/60 border box-border rounded-full invisible group-hover:visible">
              <ArrowUpFromLine width="16" height="16" />
            </div>
          </Avatar>
          <div className="ml-4 my-auto">
            <Button size="sm" className="h-6 px-2 inline-flex items-center gap-1" {...getRootProps()}>
              <ArrowUpFromLine width="14" height="14" />
              更新头像
            </Button>
            <p className="text-xs text-muted-foreground mt-2">可以拖动图片到左边头像区域完成上传</p>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
