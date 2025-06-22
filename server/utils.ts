import { PostgrestError } from "@supabase/supabase-js"

export const getErrorMessage = (error: PostgrestError | null, customMsg: string = 'sign up error') => {
  return error?.message ?? error?.code ?? customMsg
}