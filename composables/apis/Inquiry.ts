import type { NewInquiryPayload } from "../types/Inquiry"

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