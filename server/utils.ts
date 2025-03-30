export const getErrorMessage = (error: { message?: string; code?: string }, customMsg: string = 'sign up error') => {
  return error.message ?? error.code ?? customMsg
}