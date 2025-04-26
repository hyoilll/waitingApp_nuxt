export interface NewInquiryPayload {
  email: string
  title: string
  content: string
}

export interface InquiryInfo extends NewInquiryPayload {
  id: number
  createdAt: string
}