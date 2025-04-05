export interface WaitingInfoResponse {
  waitngList?: any
  error?: string
}

export interface User {
  id: string
  email: string;
  shop_name: string;
}

export interface Shop {
  id: string
  user_id: string
  current_number: number
}

export interface SignUpUserInfo {
  email: string
  password: string
  shopName: string
}

export interface Entry {
  id: string;
  entry_number: number;
  created_at: string;
  entered_at: string | null;
  visitor_count: number;
  status: 'waiting' | 'entered' | 'cancelled' | 'exited';
  is_notification_enabled: boolean;
  is_called: boolean;
}