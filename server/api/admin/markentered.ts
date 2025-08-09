import { serverSupabaseClient } from '#supabase/server'
import { getErrorMessage } from '../../utils'

interface EntryInfo {
  is_called: boolean;
}

export default eventHandler(async (event) => {
  const query = await readBody(event)
  const client = await serverSupabaseClient(event)

  try {
    const {data, error: selectError} = await client
      .from('entries')
      .select('is_called')
      .eq('id', query.entryId);

    if (selectError) {
      return { error: getErrorMessage(selectError, '入店情報の取得に失敗しました') };
    }

    if (data !== null && (data as EntryInfo[]).at(0)?.is_called === false) {
      return { error: '先に呼出を実行してください。' };
    }
    
    const { error } = await client
      .from('entries')
      .update({ status: 'entered', entered_at: new Date() })
      .eq('id', query.entryId);

    if (error) {
      return { error: getErrorMessage(error, '入店処理に失敗しました') };
    }

    return true;
  }
  catch (error) {
    return { error: '予期せぬエラーが発生しました' };
  }
})
