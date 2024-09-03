import { User } from '../types/user.type'

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getProfileFormLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
