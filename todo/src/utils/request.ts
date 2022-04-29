/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { ApiResponse } from '@/types/types'
import { ElMessageBox, MessageBoxData } from 'element-plus'
import { BASE_URL, TIME_OUT } from '@/api/config'

type MessageBoxType = 'success' | 'info' | 'warning' | 'error'

export class Request {

  public static axiosInstance: AxiosInstance

  private static BASE_URL: string = BASE_URL
  
  private static TIME_OUT: number = TIME_OUT

  private static openMessageBox = (type: MessageBoxType, message: string): Promise<MessageBoxData> => ElMessageBox({
    type,
    message,
    title: 'Error'
  })
  
  private static initInterceptors() {
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    /**
     * 请求拦截器
     */
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, error => {
      console.error(error)
      this.openMessageBox('error', error)
    })

    /**
     * 响应拦截器
     */
    this.axiosInstance.interceptors.response.use((response: AxiosResponse<ApiResponse>) => {
      if (response.status !== 200) {
        this.handleErrorCode(response)
      }
      return response
    }, error => {
      console.error(error)
      this.openMessageBox('error', error)
    })
  }

  private static handleErrorCode(response: AxiosResponse<ApiResponse>) {
    switch (response.status) {
      case 401:
      case 403:
        this.openMessageBox('error', 'Unauthorized')
        break;
      case 404:
        this.openMessageBox('error', '404 Not Found !')
        break
      case 500:
        this.openMessageBox('error', 'Server Error !')
    }
  }

  static {
    const { BASE_URL, TIME_OUT } = this
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: TIME_OUT
    })
    this.initInterceptors()
  }
}

export function request (url: string, method: Method, data?: any): Promise<ApiResponse> {
  return new Promise<ApiResponse>((resolve, reject) => {
    Request.axiosInstance({ method, url, data }).then(
      resp => resolve(resp.data),
      err => reject(err)
    )
  })
}
