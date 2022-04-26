/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { ElMessageBox, MessageBoxData } from 'element-plus'
import { SUCCESS_CODE } from '@/config/requestCode'
import { BASE_URL, TIME_OUT } from '@/api/config'

type MessageBoxType = 'success' | 'info' | 'warning' | 'error'

export class Request {

  public static axiosInstance: AxiosInstance

  private static BASE_URL: string = BASE_URL
  
  private static TIME_OUT: number = TIME_OUT

  private static openMessageBox = (type: MessageBoxType, message: string): Promise<MessageBoxData> => {
    return ElMessageBox({
      type,
      message,
      title: 'Error'
    })
  }

  private static initInterceptors() {
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    /**
     * 请求拦截器
     * 1. 请求发起时，打开 loading
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
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      if (response.status == SUCCESS_CODE) {
        this.handleErrorCode(response)
      }
      return response
    }, error => {
      console.error(error)
      this.openMessageBox('error', error)
    })
  }

  private static handleErrorCode(response: AxiosResponse) {
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

export function request(url: string, method: Method, data?: unknown) {
  return Request.axiosInstance({
    method,
    url,
    data
  })
}