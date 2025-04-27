
/**
 * Fetches the list of inquiries.
 * @returns 
 */
export const getInquryList = async () => {
  return await useFetch('/api/inquiry/getlist', {
    headers: useRequestHeaders(['cookie'])
  })
}