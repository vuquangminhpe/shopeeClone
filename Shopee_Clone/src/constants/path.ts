const path = {
  home: '/',
  user: '/user',
  login: '/login',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  register: '/register',
  productDetail: ':nameId',
  cart: '/cart'
} as const
export default path
