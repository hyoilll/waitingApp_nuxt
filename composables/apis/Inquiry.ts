import type { NewCommentPayload, NewInquiryPayload } from "../types/Inquiry"

/**
 * Fetches the list of inquiries.
 * @returns 
 */
export const getInquryList = async () => {
  return await useFetch('/api/inquiry/getlist', {
    headers: useRequestHeaders(['cookie'])
  })
}

/**
 * adds a new inquiry.
 * @param payload 
 * @returns 
 */
export const addInquiry = async (payload: NewInquiryPayload) => {
  return await $fetch('/api/inquiry/add', {
    method: 'POST',
    body: payload,
  })
}

/**
 * Fetches the details of a specific inquiry.
 * @param inquiryId 
 * @returns 
 */
export const getDetailInquiry = async (inquiryId: number) => {
  return await useFetch(`/api/inquiry/${inquiryId}/detail`, {
    headers: useRequestHeaders(['cookie']),
  })
}

/**
 * Fetches the list of comments for a specific inquiry.
 * @param inquiryId 
 * @returns 
 */
export const getComments = async (inquiryId: number) => {
  return await useFetch(`/api/inquiry/comment/${inquiryId}/getlist`, {
    headers: useRequestHeaders(['cookie']),
  })
}

/**
 * adds a new comment to an inquiry.
 * @param payload 
 * @returns 
 */
export const addComment = async (inquiryId: number, payload: NewCommentPayload) => {
  return await $fetch(`/api/inquiry/comment/${inquiryId}/add`, {
    method: 'POST',
    body: payload,
  })
}