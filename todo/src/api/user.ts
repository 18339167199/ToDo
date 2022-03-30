import { request } from "@/utils/request"

export function login(data: any) {
  return request(
    '/login',
    'post',
    data
  )
}