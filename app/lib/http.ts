import axios from "axios";
import { get } from "lodash-es";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "~/components/ui/use-toast";

export const TOEKN_KEY = "token";

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  jwtToken?: string;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: ENV.SERVER_HOST, timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config) => {
        const token = this.jwtToken ?? localStorage?.getItem(TOEKN_KEY);
        // 一般会请求拦截里面加token，用于后端的验证
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = get(err, ["response", "data", "error", "message"]);

        if (!message) {
          switch (err.response.status) {
            case 400:
              message = "请求错误(400)";
              break;
            case 401:
              message = "未授权，请重新登录(401)";
              // 这里可以做清空storage并跳转到登录页的操作
              break;
            case 403:
              message = "拒绝访问(403)";
              break;
            case 404:
              message = "请求出错(404)";
              break;
            case 408:
              message = "请求超时(408)";
              break;
            case 500:
              message = "服务器错误(500)";
              break;
            case 501:
              message = "服务未实现(501)";
              break;
            case 502:
              message = "网络错误(502)";
              break;
            case 503:
              message = "服务不可用(503)";
              break;
            case 504:
              message = "网络超时(504)";
              break;
            case 505:
              message = "HTTP版本不受支持(505)";
              break;
            default:
              message = `连接出错(${err.response.status})!`;
          }
          message = `${message}，请检查网络或联系管理员！`;
        }

        toast({
          description: message,
          variant: "destructive",
        });

        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }

  public setJwtToken = (token: string) => {
    this.jwtToken = token;
  };

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({});
