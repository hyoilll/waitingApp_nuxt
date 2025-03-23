import type { WaitingInfoResponse } from "../types/Admin";

/**
 * 待っている順番のリストを返す
 * @param queueId 
 * @returns 
 */
export const getWaitingList = async (queueId: string): Promise<WaitingInfoResponse> => {
  const supabase = useSupabaseClient()

  try {
    const { data: waitngList, error } = await supabase
    .from('entries')
    .select('*')
    .eq('queue_id', queueId)
    .is('entered_at', null)
    .eq('status', 'waiting')
    .order('entry_number', { ascending: true });

    if (error) {
      console.error('待ち組のリスト取得エラー:', error);
      return { error: '待ち組のリスト取得に失敗しました' };
    }

    return { waitngList };
  } catch (error) {
    console.error('待ち組のリスト取得エラー:', error);
    return { error: '予期せぬエラーが発生しました' };
  }
};