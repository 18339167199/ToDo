import { request } from "@/utils/request"

export const getGroupsApi = (data?: unknown) => request('/groups.json', 'get', data)

export const getFolderApi = (data?: unknown) => request('/folders.json', 'get', data)
