import validateEmail from './validateEmail'

describe('validateEmail', () => {
  it('should allow well formatted email addresses', () => {
    expect(validateEmail('test@user.com')).toBeTruthy()
  })

  it(`should allow only alpha-numeric characters (upper and lower), periods,
    underscores, pluses and hyphens allowed before the @`, () => {
    expect(validateEmail('Test%Something@user.com')).toBeFalsy()
  })

  it(`should allow only alpha-numeric characters (upper and lower), periods, and
    hyphens after the @`, () => {
    expect(validateEmail('test@user%something.com')).toBeFalsy()
  })

  it(`should require a final period followed by at least 2 alpha-numeric
    characters`, () => {
    expect(validateEmail('test@user.a')).toBeFalsy()
  })
})
