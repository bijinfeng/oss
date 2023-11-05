import type { IUploaderPlugin, IUploader } from "../../interface";

import QiniuUploader from "./qiniu";
import AliyunUploader from "./aliyun";

const buildInUploaders: IUploaderPlugin = () => {
  return {
    register(ctx: IUploader) {
      ctx.helper.uploader.register("qiniu", QiniuUploader);
      ctx.helper.uploader.register("aliyun", AliyunUploader);
    },
  };
};

export default buildInUploaders;
