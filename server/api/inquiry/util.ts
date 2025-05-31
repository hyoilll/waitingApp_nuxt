import { SupabaseClient } from '@supabase/supabase-js'
import { getErrorMessage } from '../../utils'
import { CommentResponse, InquiryResponse } from './types'

export const getInquiriesWithComments = async (client: SupabaseClient) => {
  const { data: inquiries, error } = await client
    .from('inquiries')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return { error: getErrorMessage(error, '問い合わせのリスト取得に失敗しました') };
  }

  const { data: comments, error: commentsError } = await client
    .from('inquiry_comments')
    .select('*, user:users(email)')
    .order('id', { ascending: true })

  if (commentsError) {
    return { error: getErrorMessage(commentsError, '問い合わせのコメント取得に失敗しました') };
  }

  const commentsByInquiryId = (comments as CommentResponse[]).reduce((acc, comment) => {
    if (!acc[comment.inquiry_id]) {
      acc[comment.inquiry_id] = [];
    }

    acc[comment.inquiry_id].push(comment);
    return acc;
  }, {} as Record<number, CommentResponse[]>);

  const inquiriesWithComments = (inquiries as InquiryResponse[]).map(inquiry => {
    const inquiryComments = commentsByInquiryId[inquiry.id] || [];

    return { 
      ...inquiry,
      comments: inquiryComments
    };
  });

  return { data: inquiriesWithComments };
}