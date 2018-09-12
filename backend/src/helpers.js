export function generateUser(obj = {}) {
  const defaultUser = {
    userId: '1',
    firstName: 'Test',
    imageURL:
      'https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg',
    emailAddress: 'test@user.com',
    lastName: 'User'
  }
  return Object.assign({}, defaultUser, obj)
}
