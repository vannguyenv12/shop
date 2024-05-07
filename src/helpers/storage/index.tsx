import { USER_DATA } from 'src/configs/auth'

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
  return {
    userData: window.localStorage.setItem(USER_DATA, userData),
    accessToken: window.localStorage.setItem(USER_DATA, accessToken),
    refreshToken: window.localStorage.setItem(USER_DATA, refreshToken)
  }
}

export const getLocalUserData = () => {
  return {
    userData: window.localStorage.getItem(USER_DATA),
    accessToken: window.localStorage.getItem(USER_DATA),
    refreshToken: window.localStorage.getItem(USER_DATA)
  }
}

export const clearLocalUserData = () => {
  window.localStorage.removeItem(USER_DATA)
  window.localStorage.removeItem(USER_DATA)
  window.localStorage.removeItem(USER_DATA)
}
