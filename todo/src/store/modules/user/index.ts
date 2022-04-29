import { UserInfo } from '@/types/types'

type State = {
  userInfo: UserInfo,
  token: string
}

const state: State = {
  userInfo: {
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
  },
  token: ''
}

const getters = {
  getUserInfo(state: State) {
    return state.userInfo
  },
  getToken(state: State) {
    return state.token
  }
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
