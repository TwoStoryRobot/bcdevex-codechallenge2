/* Requests
 * REST API wrapper functions
 */

import createError from 'http-errors'

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

  return (
    fetch(process.env.REACT_APP_API_URL + 'fetch', {
      method,
      headers,
      signal: controller.signal
    })
      //  Fetch does not throw http errors by default. This will throw
      .then(res => {
        if (!res.ok) throw createError(res.status, res.statusText)
        else return res
      })
      .then(res => res.json())
      .then(users => ({ users, controller }))
  )
}

export function deleteUser(user) {
  const method = 'POST'
  const body = JSON.stringify(user)
  const headers = getDefaultHeaders()
  const url = process.env.REACT_APP_API_URL + 'delete'
  return fetch(url, { method, body, headers })
}

export function updateUser(user) {
  const controller = new window.AbortController()
  const method = 'POST'
  const headers = getDefaultHeaders()
  const body = JSON.stringify(user)

  return fetch(process.env.REACT_APP_API_URL + 'update', {
    method,
    headers,
    body,
    signal: controller.signal
  })
    .then(res => res.json())
    .then(users => ({ users, controller }))
}
