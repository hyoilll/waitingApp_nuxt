export interface NewInquiryPayload {
  user_id: string
  email: string
  title: string
  content: string
}

export interface NewCommentPayload {
  user_id: string
  inquiry_id: number
  content: string
}

export interface InquiryInfo extends NewInquiryPayload {
  id: number
  created_at: string
}

export interface InquiryComment {
  id: number
  inquiry_id: number
  content: string
  created_at: string
  user: {
    email: string
  }
}