/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { useControllableValue } from "ahooks";

interface FileUploadProps {
  value?: string;
  onChange?: (value?: string) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (props, ref) => {
    const [value, onChange] = useControllableValue<string>(props);
    const [preview, setPreview] = useState(value);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [],
      },
      maxSize: MAX_FILE_SIZE,
      onDrop: async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setPreview(URL.createObjectURL(file));
          // const fileData = await uploadFile({ file, isTemp: true });
          // const url = fileData?.data?.url;
          // url && onChange(url);
        }
      },
    });

    return (
      <div {...getRootProps({ ref, className: clsx() })}>
        <input {...getInputProps()} />
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
