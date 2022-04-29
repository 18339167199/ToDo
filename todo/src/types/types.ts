import { AxiosResponse } from 'axios'

type Group = {
  id: number,
  name: string,
  type: number,
  icon: string,
  count: number,
  folderId: number | null
}

type Folder = {
  id: number,
  ownerId: number,
  name: string
}

type BG = {
  background: string,
  image: string,
}

type Sort = {
  label: string,
  value: string | number
}

type Task = {
  id: string,
  content: string,
  expire: string,
  done: boolean,
  star: boolean,
  step: [
    {
      seqNo: number,
      content: string,
      done: boolean,
    }
  ]
}

type UserInfo = {
  nikeName: '',
  realName: '',
  phone: '',
  country: '',
  national: '',
  address: '',
  hobby: '',
  job: '',
  signature: '',
  profile: '',
  defaultGroup: '',
  birthday: '',
  gender: ''
}

type ApiResponse = {
  code: number,
  message: string,
  data: any
}

export {
  Group,
  Folder,
  BG,
  Sort,
  Task,
  UserInfo,
  ApiResponse
}