import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { ElLoading, ElMessageBox, MessageBoxData } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

type MessageBoxType = 'success' | 'info' | 'warning' | 'error'

export class Request {

  public static axiosInstance: AxiosInstance

  public static loading: LoadingInstance

  private static BASE_URL = '/api'
  
  private static TIME_OUT = 5000
  
  private static LOADING_TEXT = 'Loading'

  private static openMessageBox = (type: MessageBoxType, message: string): Promise<MessageBoxData> => {
    return ElMessageBox({
      type,
      message,
      title: 'Error'
    })
  }

  private static initInterceptors(loadingText: string) {
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    /**
     * 请求拦截器
     * 1. 请求发起时，打开 loading
     */
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      this.loading = ElLoading.service({
        lock: true,
        text: loadingText,
        background: 'rgba(0, 0, 0, 0.5)'
      })
      return config
    }, error => {
      console.error(error)
      this.openMessageBox('error', error)
    })

    /**
     * 响应拦截器
     */
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      this.loading?.close()
      if (response.status !== 200) {
        this.handleErrorCode(response)
      }
      return response
    }, error => {
      console.error(error)
      this.openMessageBox('error', error)
      this.loading?.close()
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
    const { BASE_URL, TIME_OUT, LOADING_TEXT } = this
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: TIME_OUT
    })
    this.initInterceptors(LOADING_TEXT)
  }
}

export function request(url: string, method: Method, data?: any) {
  return Request.axiosInstance({
    method,
    url,
    data
  })
}