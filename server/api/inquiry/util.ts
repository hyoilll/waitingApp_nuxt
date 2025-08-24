import { SupabaseClient } from '@supabase/supabase-js'
import { getErrorMessage } from '../../utils'
import { CommentResponse, InquiryResponse } from './types'

export const getInquiriesWithComments = async (client: SupabaseClient) => {
  const [{ data: inquiries, error: inquiriesError }, { data: comments, error: commentsError }] = await Promise.all([
    client
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false }),
    client
      .from('inquiry_comments')
      .select('*, user:users(email)')
      .order('created_at', { ascending: false })
  ]);

  if (inquiriesError || commentsError) {
    return { 
      error: inquiriesError 
        ? getErrorMessage(inquiriesError, 'server.error.fetchInquiryListFailed') 
        : getErrorMessage(commentsError, 'server.error.fetchCommentFailed') 
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
