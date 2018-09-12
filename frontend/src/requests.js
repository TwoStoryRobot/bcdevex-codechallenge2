/* Requests
 * REST API wrapper functions
 */

export function getDefaultHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json; charset=utf-8'
  }
}

export function authenticate(profile) {
  const method = 'POST'
  const headers = getDefaultHeaders()
  const body = JSON.stringify(profile)
  const url = process.env.REACT_APP_API_URL + 'authenticate'
  return fetch(url, { method, body, headers })
}
