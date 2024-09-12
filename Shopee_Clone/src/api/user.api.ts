import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
interface BodyUpdateProfile extends Omit<User, 'email' | '_id' | 'roles' | 'createdAt' | 'updateAt'> {
  password: string
  new_password: string
}
const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<BodyUpdateProfile>>('user', body)
  },
  uploadProfile(body: FormData) {
    return http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
