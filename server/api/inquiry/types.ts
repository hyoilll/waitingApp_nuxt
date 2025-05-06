export interface InquiryResponse {
  id: number;
  title: string;
  content: string;
  created_at: string;
  email: string;
}

export interface CommentResponse {
  id: number;
  inquiry_id: number;
  content: string;
  created_at: string;
  user: {
    email: string;
  };
}