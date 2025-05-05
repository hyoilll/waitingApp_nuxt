import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../../utils'

interface InquiryResponse {
  id: number;
  title: string;
  content: string;
  created_at: string;
  email: string;
}

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const inquiryId = event.context.params?.id;

  if (!inquiryId) {
    return { error: 'IDが指定されていません' };
  }

  try {
    const { data, error } = await client
      .from('inquiries')
      .select('*, user:users(email)')

    if (error) {
      return { error: getErrorMessage(error, '問い合わせの詳細取得に失敗しました') };
    }

    const targetIdx = (data as InquiryResponse[]).findIndex(item => item.id === Number(inquiryId))
    const enableLeftBtn = targetIdx > 0
    const enableRightBtn = targetIdx < (data as InquiryResponse[]).length - 1
    const ids = (data as InquiryResponse[]).map(item => item.id)
    const inquiry = (data as InquiryResponse[])[targetIdx]

    const { data: comments, error: commentError } = await client
      .from('inquiry_comments')
      .select('*, user:users(email)')
      .eq('inquiry_id', inquiryId)
    
    if (commentError) {
      return { error: getErrorMessage(commentError, '問い合わせのコメント取得に失敗しました') };
    }

    return { 
      inquirys: data,
      comments,
    };
  
  } catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
