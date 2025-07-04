export interface NewInquiryPayload {
  user_id: string
  email: string
  title: string
  content: string
}

export interface NewCommentPayload {
  user_id: string
  content: string
}

export interface InquiryComment {
  id: number
  inquiry_id: number
  content: string
  created_at: string
  updated_at: string
  user: {
    email: string
  }
}

export interface InquiryInfo extends NewInquiryPayload {
  id: number
  created_at: string
  updated_at: string
  comments: InquiryComment[]
}

export interface InquiryUpdateForm {
  title: string
  content: string
}

export interface InquiryUpdatePayload extends InquiryUpdateForm {
  user_id: string
}