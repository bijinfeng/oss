import { useControllableValue } from "ahooks";
import { ArrowUpFromLine } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useRef, forwardRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Cropper, { CropperFunRef } from "@/components/ui/cropper";
import { dataURItoBlob } from "@/lib/utils";
import { uploadImage } from "@/lib/request";

interface AvatarUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const AvatarUpload = forwardRef<HTMLDivElement, AvatarUploadProps>(
  (props, ref) => {
    const cropperRef = useRef<CropperFunRef>(null);
    const [open, setOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useControllableValue<string>(props);
    const [previewUrl, setPreviewUrl] = useState(avatarUrl);
    const [uploading, setUploading] = useState<boolean>(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
      setOpen(true);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
    });

    const handleSubmit = async () => {
      const img = cropperRef.current?.crop();
      if (!img) return;

      setUploading(true);
      const blob = dataURItoBlob(img);
      const res = await uploadImage(blob);
      setAvatarUrl(res.url);
      setUploading(false);
      setOpen(false);
    };

    return (
      <div ref={ref} className="flex">
        <input {...getInputProps()} />
        <Avatar
          {...getRootProps()}
          className="w-20 h-20 cursor-pointer relative group"
        >
          <AvatarImage src={avatarUrl} />
          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black/60 border box-border rounded-full invisible group-hover:visible">
            <ArrowUpFromLine width="16" height="16" />
          </div>
        </Avatar>
        <div className="ml-4 my-auto">
          <Button
            size="sm"
            className="h-6 px-2 inline-flex items-center gap-1"
            {...getRootProps()}
          >
            <ArrowUpFromLine width="14" height="14" />
            更新头像
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            可以拖动图片到左边头像区域完成上传
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent style={{ width: 520 }} className="space-y-4">
            <DialogHeader>
              <DialogTitle>编辑头像</DialogTitle>
            </DialogHeader>

            <Cropper ref={cropperRef} src={previewUrl} />

            <div>
              <Button
                size="sm"
                className="inline-flex items-center gap-1"
                {...getRootProps()}
              >
                <ArrowUpFromLine width="14" height="14" />
                重新选择
              </Button>
            </div>

            <DialogFooter>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                取消
              </Button>
              <Button size="sm" onClick={handleSubmit} loading={uploading}>
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
