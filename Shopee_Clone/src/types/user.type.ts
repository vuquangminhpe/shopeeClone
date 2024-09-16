type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string // ISO 8610
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
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
  email: string
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
