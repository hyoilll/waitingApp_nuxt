import { SupabaseClient } from '@supabase/supabase-js'
import { getErrorMessage } from '../../utils'
import { CommentResponse, InquiryResponse } from './types'

export const getInquiriesWithComments = async (client: SupabaseClient) => {
  const [{ data: inquiries, error: inquiriesError }, { data: comments, error: commentsError }] = await Promise.all([
    client
      .from('inquiries')
      .select('*')
      .order('id', { ascending: true }),
    client
      .from('inquiry_comments')
      .select('*, user:users(email)')
      .order('id', { ascending: true })
  ]);

  if (inquiriesError || commentsError) {
    return { 
      error: inquiriesError 
        ? getErrorMessage(inquiriesError, '問い合わせのリスト取得に失敗しました') 
        : getErrorMessage(commentsError, '問い合わせのコメント取得に失敗しました') 
    };
  }

  const commentsByInquiryId = new Map<number, CommentResponse[]>();
  (comments as CommentResponse[]).forEach(comment => {
    const inquiryComments = commentsByInquiryId.get(comment.inquiry_id) || [];
    inquiryComments.push(comment);
    commentsByInquiryId.set(comment.inquiry_id, inquiryComments);
  });

  const inquiriesWithComments = (inquiries as InquiryResponse[]).map(inquiry => ({
    ...inquiry,
    comments: commentsByInquiryId.get(inquiry.id) || []
  }));

  return { data: inquiriesWithComments };
}