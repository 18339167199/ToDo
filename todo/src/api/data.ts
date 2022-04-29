import { request } from "@/utils/request"

export const getGroupsApi = (data?: any) => request('/groups.json', 'get', data)

export const getFolderApi = (data?: any) => request('/folders.json', 'get', data)

export const getTasksApi = (data?: any) => request('/tasks.json', 'get', data)
