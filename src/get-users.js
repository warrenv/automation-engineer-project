import rp from 'request-promise'

export const urlHost = 'https://jsonplaceholder.typicode.com'
export const urlPath = '/users'

export default async () => {
  try {
    const users = await rp({
      method: 'GET',
      uri: `${urlHost}${urlPath}`,
      json: true,
    })

    return { code: 0, users }
  } catch (e) {
    return { code: 1, message: e.message, users: [] }
  }
}
