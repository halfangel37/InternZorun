/**
 * player.js
 */
import api from '@/api'

const state = {
  phoneNumber: '',
  codeVerify: '',
  status: '',
  statusCode: 0,
  message: '',
  auth: '',
  token: '',
  user: {},
  userAvatar: '',
  userName: '',
  userNickName: '',
  userDob: '',
  userPosition: '',
  userFavorNumber: '',
  userHeigt: '',
  userWeight: '',
  userFoot: '',
  socialID: '',
  socialType: '',
  socialStatus: false,
  post: FormData,
}

const getters = {
  isLoggedIn(state) {
    return !!state.token
  },
}

const mutations = {
  SET_PHONE_NUMBER(state, payload) {
    state.phoneNumber = payload
  },
  SET_CODE_VERIFY(state, payload) {
    state.codeVerify = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_STATUS(state, payload) {
    state.status = payload
  },
  SET_STATUS_CODE(state, payload) {
    state.statusCode = payload
  },
  SET_MESSAGE(state, payload) {
    state.message = payload
  },
  SET_AUTHEN(state, payload) {
    state.auth = payload.auth
    state.token = payload.token
    state.user = payload.user
  },
  SET_USER_PROFILE(state, payload) {
    state.post = payload
    // state.userName = payload.userName
    // state.userNickName = payload.userNickName
    // state.userDob = payload.userDob
    // state.userPosition = payload.userPosition
    // state.userFavorNumber = payload.userFavorNumber
    // state.userHeight = payload.userHeight
    // state.userWeight = payload.userWeight
    // state.userFoot = payload.userFoot
  },
  SET_SOCIAL_ID(state, payload) {
    state.socialID = payload
  },
  SET_SOCIAL_TYPE(state, payload) {
    state.socialType = payload
  },
  SET_SOCIAL_STATUS(state, payload) {
    state.socialStatus = payload
  },
}

const actions = {
  async checkPhoneNumber({ commit }, payload) {
    try {
      const response = await api.post('/check-phone-number', {
        phone_number: payload,
      })
      if (response.data.status_code === 200) {
        commit('SET_PHONE_NUMBER', payload)
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
      } else if (response.data.status_code === 401) {
        commit('SET_PHONE_NUMBER', payload)
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async sendCodeVerify({ commit }, payload) {
    try {
      const response = await api.post('/send-code-vefify', {
        phone_number: payload,
      })
      if (response.data.status_code === 200) {
        commit('SET_CODE_VERIFY', response.data.data)
        commit('SET_PHONE_NUMBER', payload)
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
      } else if (response.data.status_code === 401) {
        commit('SET_CODE_VERIFY', response.data.data)
        commit('SET_PHONE_NUMBER', payload)
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async login({ commit }, payload) {
    try {
      const response = await api.post('/login', {
        phone_number: payload.phone_number,
        code_active: payload.code_active,
      })
      if (response.data.status_code === 200) {
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
        commit('SET_AUTHEN', {
          auth: 'success',
          token: response.data.data.access_token,
          user: response.data.data,
        })
      } else if (response.data.status_code === 401) {
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)

        commit('SET_AUTHEN', {
          auth: 'fail',
          token: '',
          user: {},
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async loginSocial({ commit }, payload) {
    try {
      const response = await api.post('/login-social', {
        social_id: payload.social_id,
        social_type: payload.social_type,
      })
      if (response.data.status_code === 200) {
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
        commit('SET_AUTHEN', {
          auth: 'success',
          token: response.data.data.access_token,
          user: response.data.data,
        })
        commit('SET_SOCIAL_ID', payload.social_id)
        commit('SET_SOCIAL_TYPE', payload.social_type)
      } else if (response.data.status_code === 201) {
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
        commit('SET_AUTHEN', {
          auth: 'fail',
          token: '',
          user: {},
        })
        commit('SET_SOCIAL_ID', payload.social_id)
        commit('SET_SOCIAL_TYPE', payload.social_type)
        commit('SET_SOCIAL_STATUS', response.data.data.isSocial)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async register({ commit }, payload) {
    try {
      const response = await api.post('/register', {
        payload,
      })
      if (response.data.status_code === 200) {
        commit('SET_STATUS', response.data.status)
        commit('SET_MESSAGE', response.data.message)
        commit('SET_STATUS_CODE', response.data.status_code)
        commit('SET_USER_PROFILE', payload)
      } else if (response.data.status_code === 422) {
        commit('SET_MESSAGE', response.data.message)
        commit('SET_USER_PROFILE', payload)
      }
    } catch (error) {
      console.log(error)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
