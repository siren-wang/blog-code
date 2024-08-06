---
date: 2021-05-17
category: Principles
title: 10x Programmer
---

> 大部分程序员忙碌解决的问题，都不是程序问题，而是由偶然复杂度导致的问题。

<!-- more -->

- 以终为始；
- 任务分解；
- 沟通反馈；
- 自动化。

```

```

```javascript
interface QueryDataInterface<T = any> {
  data: {
    code: number;
    message: string;
    data: T;
    [key: string]: any;
  };
}

export class HttpError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly cause: string;

  constructor(httpCode: number, message: string, cause?: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'HttpError';
    this.httpCode = httpCode;
    this.cause = cause || 'Network Error';

    Error.captureStackTrace(this);
  }
}

/**
 * @param { Promise } promise
 * @param { Number } expectedCode
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function requestHandler<T>(
  promise: Promise<QueryDataInterface<T>>,
  expectedCode = apiCode,
  errorExt?: object
): Promise<T> {
  return promise
    .then((result: QueryDataInterface<T>) => {
      if (result && result.data && result.data.code === expectedCode) {
        return result.data.data;
      }

      throw new Error(result?.data?.message || '请求失败');
    })
    .catch((err: Error) => {
      message.error(err.message, /* duration */ 10);

      throw err;
    });
}
```

**Axios**

```javascript
import axios from 'axios';

interface ParamsInterface<T> {
  method: any;
  url: string;
  params?: {
    [key: string]: any;
  };
  data?: T;
  timeout?: number;
  proxy?: {
    host: string;
    port: number;
    [key: string]: any;
  };
  [key: string]: any;
}

interface QueryDataInterface<T> {
  data: {
    code: number;
    message: string;
    data: T;
    [key: string]: any;
  };
}

export default <T>(parameter: ParamsInterface<any>) => {
  const defaults: ParamsInterface<object> = {
    // 请求方式get post等
    method: 'get',
    // url
    url: '',
    // url参数
    params: {},
    // POST、PUT、PATCH请求参数
    data: {},
    // 超时时间
    timeout: 1800000,
    // 代理
    proxy: {
      host: '',
      port: 0,
    },
  };
  return new Promise<QueryDataInterface<T>>((resolve: any, reject: any) => {
    try {
      /**
       * 拦截请求
       */
      axios.interceptors.request.use(
        (config) => config,
        (error) => reject(error)
      );
      /**
       * 拦截响应
       */
      axios.interceptors.response.use(
        (response) => response,
        (error) => reject(error)
      );
      resolve(axios({ ...defaults, ...parameter }));
    } catch (e) {
      reject(e);
    }
  });
};

```


**接口定义**

```javascript
export const pointSearch = (data: AiPredPointSearchReq) =>
  requestHandler(
    Http<AiPredPointSearchResponse>({
      method: 'post',
      url: `/api/ai/pred/pointSearch`,
      data: formatPointSearchRequest(data),
    })
  );

```


