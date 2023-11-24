import mime from "mime-types";
import CryptoJS from "crypto-js";

import type {
  IUploader,
  IPluginConfig,
  IAliyunConfig,
  IPlugin,
} from "../../interface";

// generate OSS signature
const generateSignature = (
  options: IAliyunConfig,
  fileName: string
): string => {
  const date = new Date().toUTCString();
  const mimeType = mime.lookup(fileName);
  if (!mimeType) throw Error(`No mime type found for file ${fileName}`);

  const signString = `PUT\n\n${mimeType}\n${date}\n/${options.bucket}/${options.path}${fileName}`;

  const signature = CryptoJS.HmacSHA1(
    signString,
    options.accessKeySecret
  ).toString(CryptoJS.enc.Base64);
  return `OSS ${options.accessKeyId}:${signature}`;
};

const postOptions = (
  options: IAliyunConfig,
  fileName: string,
  signature: string,
  image: Buffer
) => {
  return {
    method: "PUT",
    url: `https://${options.bucket}.${options.area}.aliyuncs.com/${encodeURI(
      options.path
    )}${encodeURIComponent(fileName)}`,
    headers: {
      Host: `${options.bucket}.${options.area}.aliyuncs.com`,
      Authorization: signature,
      Date: new Date().toUTCString(),
      "Content-Type": mime.lookup(fileName),
    },
    body: image,
    resolveWithFullResponse: true,
  };
};

const handle = async (ctx: IUploader) => {
  const aliYunOptions = ctx.getConfig<IAliyunConfig>("picBed.aliyun");
  if (!aliYunOptions) {
    throw new Error("Can't find aliYun OSS config");
  }
  try {
    const imgList = ctx.output;
    const customUrl = aliYunOptions.customUrl;
    const path = aliYunOptions.path;
    for (const img of imgList) {
      if (img.fileName && img.buffer) {
        const signature = generateSignature(aliYunOptions, img.fileName);
        let image = img.buffer;
        if (!image && img.base64Image) {
          image = Buffer.from(img.base64Image, "base64");
        }
        const options = postOptions(
          aliYunOptions,
          img.fileName,
          signature,
          image
        );
        const body = await ctx.request(options);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (body.statusCode === 200) {
          delete img.base64Image;
          delete img.buffer;
          const optionUrl = aliYunOptions.options || "";
          if (customUrl) {
            img.imgUrl = `${customUrl}/${encodeURI(path)}${encodeURIComponent(
              img.fileName
            )}${optionUrl}`;
          } else {
            img.imgUrl = `https://${aliYunOptions.bucket}.${
              aliYunOptions.area
            }.aliyuncs.com/${encodeURI(path)}${encodeURIComponent(
              img.fileName
            )}${optionUrl}`;
          }
        } else {
          throw new Error("Upload failed");
        }
      }
    }
    return ctx;
  } catch (err) {
    // ctx.emit(IBuildInEvent.NOTIFICATION, {
    //   title: ctx.i18n.translate<ILocalesKey>('UPLOAD_FAILED'),
    //   body: ctx.i18n.translate<ILocalesKey>('CHECK_SETTINGS')
    // })
    // throw err
  }
};

const config = (ctx: IUploader): IPluginConfig[] => {
  const userConfig = ctx.getConfig<IAliyunConfig>("picBed.aliyun") || {};
  const config: IPluginConfig[] = [
    {
      name: "accessKeyId",
      type: "input",
      get alias() {
        return "设定KeyId";
      },
      default: userConfig.accessKeyId || "",
      required: true,
    },
    {
      name: "accessKeySecret",
      type: "password",
      get alias() {
        return "设定KeySecret";
      },
      default: userConfig.accessKeySecret || "",
      required: true,
    },
    {
      name: "bucket",
      type: "input",
      get alias() {
        return "设定Bucket";
      },
      default: userConfig.bucket || "",
      required: true,
    },
    {
      name: "area",
      type: "input",
      get prefix() {
        return "设定存储区域";
      },
      get alias() {
        return "设定存储区域";
      },
      default: userConfig.area || "",
      get message() {
        return "例如：oss-cn-beijing";
      },
      required: true,
    },
    {
      name: "path",
      type: "input",
      get prefix() {
        return "设定存储路径";
      },
      get alias() {
        return "设定存储路径";
      },
      get message() {
        return "例如：test/";
      },
      default: userConfig.path || "",
      required: false,
    },
    {
      name: "customUrl",
      type: "input",
      get prefix() {
        return "设定自定义域名";
      },
      get alias() {
        return "设定自定义域名";
      },
      get message() {
        return "例如：https://test.com";
      },
      default: userConfig.customUrl || "",
      required: false,
    },
    {
      name: "options",
      type: "input",
      get prefix() {
        return "设定网址后缀";
      },
      get alias() {
        return "设定网址后缀";
      },
      get message() {
        return "例如：?x-oss-process=xxx";
      },
      default: userConfig.options || "",
      required: false,
    },
  ];
  return config;
};

const plugin: IPlugin = {
  name: "阿里云OSS",
  handle,
  config,
};

export default plugin;
