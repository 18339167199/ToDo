import { request } from "@/utils/request"

export function login(data: unknown) {
  return request(
    '/login',
    'post',
    data
  )
}

