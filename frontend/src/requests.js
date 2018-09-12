/* Requests
 * REST API wrapper functions
 */

function getDefaultHeaders() {
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

export function getUsers() {
  //  controller is used to abort request
  const controller = new window.AbortController()
  const method = 'GET'
  const headers = getDefaultHeaders()

  return fetch(process.env.REACT_APP_API_URL + 'fetch', {
    method,
    headers,
    signal: controller.signal
  })
    .then(res => res.json())
    .then(users => ({ users, controller }))
}
