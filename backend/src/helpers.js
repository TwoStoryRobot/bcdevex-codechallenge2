import jwt from 'jsonwebtoken'

export function generateNewUser(obj = {}) {
  // New user requests do not specify the admin field
  const defaultUser = {
    userId: '1',
    firstName: 'Test',
    imageURL:
      'https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg',
    emailAddress: 'test@user.com',
    lastName: 'User',
    registeredAt: '2018-09-12T14:35:38-07:00'
  }
  return Object.assign({}, defaultUser, obj)
}

export function generateUser(obj = {}) {
  const defaultUser = {
    userId: '1',
    firstName: 'Test',
    imageURL: 'https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg',
    emailAddress: 'test@user.com',
    lastName: 'User',
    isAdmin: false
  }
  return Object.assign({}, defaultUser, obj)
}

export function generateToken(userId = '1') {
  const sub = userId
  const aud = process.env.CLIENT_ID
  const iss = 'accounts.google.com'
  const payload = { sub, aud, iss }
  return jwt.sign(payload, 'test_secret')
}
