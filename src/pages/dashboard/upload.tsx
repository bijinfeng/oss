import Dropzone from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const Upload = () => {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
        <CardDescription>
          最大可上传 5.00 MB 的图片，上传队列最多 3 张.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed rounded-md relative">
          <Dropzone
            maxSize={MAX_FILE_SIZE}
            maxFiles={3}
            accept={{ "image/*": [] }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className:
                    " flex flex-col items-center justify-center min-h-[340px] space-y-0.5",
                })}
              >
                <input {...getInputProps()} />
                <UploadCloud className="text-muted-foreground" size={60} />
                <p className="text-muted-foreground">
                  拖拽文件到这里，支持多文件同时上传
                </p>
                <p className="text-muted-foreground">
                  点击上面的图标上传全部已选择文件
                </p>
              </div>
            )}
          </Dropzone>
          <Button
            variant="ghost"
            className="rounded-full px-2 h-auto absolute top-4 right-3"
          >
            <X />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Upload;
