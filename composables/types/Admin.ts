export interface WaitingInfoResponse {
  waitngList?: any
  error?: string
}

export interface User {
  id: string
  email: string;
  shop_name: string;
}

export interface SignUpUserInfo {
  email: string
  password: string
  shopName: string
}