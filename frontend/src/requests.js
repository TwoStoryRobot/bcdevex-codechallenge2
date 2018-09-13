/* Requests
 * REST API wrapper functions
 */

import createError from 'http-errors'

//  Fetch does not throw http errors by default. This will throw
function handleError(res) {
  if (!res.ok) throw createError(res.status, res.statusText)
  else return res
}

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
    .then(handleError)
    .then(res => res.json())
    .then(users => ({ users, controller }))
}

export function sendEmail(userId) {
  //  controller is used to abort request
  const controller = new window.AbortController()
  const method = 'POST'
  const headers = getDefaultHeaders()
  const body = JSON.stringify({ userId })

  return fetch(process.env.REACT_APP_API_URL + 'sendEmail', {
    method,
    headers,
    body,
    signal: controller.signal
  })
    .then(handleError)
    .then(res => res.text())
    .then(body => ({ body, controller }))
}

export function deleteUser(userId) {
  const method = 'POST'
  const body = JSON.stringify({ userId })
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
