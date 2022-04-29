import { request } from "@/utils/request"

export const login = (data?: any) => request('/login', 'post', data)

export const getCredentials = (data?: any) => request('/credentials', 'post', data)
