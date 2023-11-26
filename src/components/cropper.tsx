import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import {
  Cropper,
  CropperRef,
  CropperPreview,
  CropperPreviewRef,
  CropperState,
  CropperImage,
  CropperTransitions,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface CropperProps {
  src: string;
}

interface PreviewState {
  state: CropperState | null;
  image: CropperImage | null;
  transitions: CropperTransitions | null;
  loading?: boolean;
  loaded?: boolean;
}

export interface CropperFunRef {
  crop: () => string;
}

const CropperInstance = forwardRef<CropperFunRef, CropperProps>(
  (props, ref) => {
    const cropperRef = useRef<CropperRef>(null);
    const previewRef = useRef<CropperPreviewRef>(null);

    const [previewState, setPreviewState] = useState<PreviewState>({
      state: null,
      image: null,
      transitions: null,
    });

    const onUpdate = () => {
      setPreviewState({
        state: cropperRef.current!.getState(),
        image: cropperRef.current!.getImage(),
        transitions: cropperRef.current!.getTransitions(),
        loaded: cropperRef.current!.isLoaded(),
        loading: cropperRef.current!.isLoading(),
      });
    };

    useImperativeHandle(ref, () => ({
      crop: () => cropperRef.current!.getCanvas()!.toDataURL(),
    }));

    return (
      <div className="flex justify-between">
        <Cropper
          ref={cropperRef}
          style={{ width: 320, height: 320 }}
          stencilProps={{ aspectRatio: 1 }}
          src={props.src}
          onUpdate={onUpdate}
        />
        <div className="flex flex-col items-center space-y-2">
          <CropperPreview
            ref={previewRef}
            style={{ width: 120, height: 120 }}
            {...previewState}
          />
          <span className="text-sm text-muted-foreground">预览</span>
        </div>
      </div>
    );
  }
);

export default CropperInstance;
