type Role = 'User' | 'Admin'

export interface User extends UserFacebook, UserGoogle {
  _id: string
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updateAt: string
  __v: number
}

export interface UserFacebook {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  graphDomain: 'facebook'
  id: string
  name: string
  signedRequest: string
  userID: string
  email?: string
}

export interface UserGoogle {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  hd: string
  name: string
  picture: string
  sub: string
}