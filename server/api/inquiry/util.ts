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

  if (inquiriesError) {
    return { error: getErrorMessage(inquiriesError, '問い合わせのリスト取得に失敗しました') };
  }

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