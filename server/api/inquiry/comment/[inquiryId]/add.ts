import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../../utils'
import { CommentResponse, InquiryResponse } from '../../types'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)
  const inquiryId = event.context.params?.inquiryId;

  try {
    const { error: insertError } = await client
      .from('inquiry_comments')
      .insert({
        ...body,
        inquiry_id: inquiryId,
      })

    if (insertError) {
      return { error: getErrorMessage(insertError, '問い合わせコメントのリスト取得に失敗しました') };
    }

    const { data: inquiries, error: selectError } = await client
      .from('inquiries')
      .select('*')

    if (selectError) {
      return { error: getErrorMessage(selectError, '問い合わせのリスト取得に失敗しました') };
    }

    // TODO: ここはgetlist.tsと重複してるので、共通化する
    const { data: comments, error: commentError } = await client
      .from('inquiry_comments')
      .select('*, user:users(email)')
            
    if (commentError) {
      return { error: getErrorMessage(commentError, '問い合わせのコメント取得に失敗しました') };
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
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
