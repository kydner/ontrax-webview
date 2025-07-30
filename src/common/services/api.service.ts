import qs from 'qs'

import { AxiosRequestConfig } from 'axios'
import { api } from 'src/boot/axios'
import { BaseResponse, BaseResponsePage } from 'src/common/interfaces/response.interface'

export type QSArrayFormat = 'repeat' | 'indices' | 'brackets' | undefined

export interface KAxiosRequestConfig extends AxiosRequestConfig {
  arrayFormat?: QSArrayFormat
}

export async function Get<TResponse = unknown>(
  url: string,
  config?: KAxiosRequestConfig,
): Promise<BaseResponse<TResponse>> {
  return await new Promise((resolve, reject) => {
    api
      .get(url, {
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              arrayFormat: config?.arrayFormat ?? 'repeat',
            }),
        },
        ...config,
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}

export async function GetPage<TResponse = unknown>(
  url: string,
  config?: KAxiosRequestConfig,
): Promise<BaseResponsePage<TResponse>> {
  const response = await api.get<BaseResponsePage<TResponse>>(url, {
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: config?.arrayFormat ?? 'repeat',
        }),
    },
    ...config,
  })
  return response.data
}

export async function Post<TDataResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  config?: KAxiosRequestConfig,
): Promise<BaseResponse<TDataResponse>> {
  return await new Promise((resolve, reject) => {
    api
      .post(url, data, {
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              arrayFormat: config?.arrayFormat ?? 'repeat',
            }),
        },
        ...config,
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}

export async function Put<TDataResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  config?: KAxiosRequestConfig,
): Promise<BaseResponse<TDataResponse>> {
  return await new Promise((resolve, reject) => {
    api
      .put(url, data, {
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              arrayFormat: config?.arrayFormat ?? 'repeat',
            }),
        },
        ...config,
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}
export async function Patch<TDataResponse = unknown, TData = unknown>(
  url: string,
  data?: TData,
  config?: KAxiosRequestConfig,
): Promise<BaseResponse<TDataResponse>> {
  return await new Promise((resolve, reject) => {
    api
      .patch(url, data, {
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              arrayFormat: config?.arrayFormat ?? 'repeat',
            }),
        },
        ...config,
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}

export async function Delete<TResponse = unknown>(
  url: string,
  config?: KAxiosRequestConfig,
): Promise<BaseResponse<TResponse>> {
  return await new Promise((resolve, reject) => {
    api
      .delete(url, {
        paramsSerializer: {
          serialize: (params) =>
            qs.stringify(params, {
              arrayFormat: config?.arrayFormat ?? 'repeat',
            }),
        },
        ...config,
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  })
}
