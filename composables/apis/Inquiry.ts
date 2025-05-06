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
  return await useFetch(`/api/inquiry/${inquiryId}/comment/getlist`, {
    headers: useRequestHeaders(['cookie']),
  })
}

/**
 * adds a new comment to an inquiry.
 * @param payload 
 * @returns 
 */
export const addComment = async (inquiryId: number, payload: NewCommentPayload) => {
  return await $fetch(`/api/inquiry/${inquiryId}/comment/add`, {
    method: 'POST',
    body: payload,
  })
}

/**
 * edits an existing comment on an inquiry.
 * @param inquiryId 
 * @param commentId 
 * @returns 
 */
export const editComment = async (inquiryId: number, commentId: number, payload: NewCommentPayload) => {
  return await $fetch(`/api/inquiry/${inquiryId}/comment/${commentId}/edit`, {
    method: 'PUT',
    body: payload,
  })
}