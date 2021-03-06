/* Tests for filterStartsWith 
 */

import filterStartsWith from './filterStartsWith'

const jonathan = {
  userId: 'jb',
  firstName: 'Jonathan',
  lastName: 'Bowers',
  emailAddress: 'jonathan.bowers@twostoryrobot.com'
}
const chad = {
  userId: 'cfa',
  firstName: 'Chad',
  lastName: 'Fawcett',
  emailAddress: 'chad.fawcett@twostoryrobot.com'
}
const kaileen = {
  userId: 'km',
  firstName: 'Kaileen',
  lastName: 'McCulloch',
  emailAddress: 'kaileen.mcculloch@twostoryrobot.com'
}
const chris = {
  userId: 'cfo',
  firstName: 'Chris',
  lastName: 'Foster',
  emailAddress: 'chris.foster@twostoryrobot.com'
}
const caleb = {
  userId: 'cs',
  firstName: 'Caleb',
  lastName: 'Sharp',
  emailAddress: 'caleb.sharp@twostoryrobot.com'
}
const monika = {
  userId: 'mp',
  firstName: 'Monika',
  lastName: 'Piechatzek',
  emailAddress: 'monika.piechatzek@twostoryrobot.com'
}

const users = [jonathan, chad, kaileen, chris, caleb, monika]

describe('filterStartsWith', () => {
  it('should return a function', () => {
    expect(typeof filterStartsWith('partial')).toBe('function')
  })

  it('should match everything if no text provided', () => {
    expect(users.filter(filterStartsWith(''))).toEqual(users)
  })

  it('should match any firstName', () => {
    expect(users.filter(filterStartsWith('Ch'))).toContain(chad)
    expect(users.filter(filterStartsWith('Ch'))).toContain(chris)
    expect(users.filter(filterStartsWith('Ch'))).not.toContain(jonathan)
    expect(users.filter(filterStartsWith('Ch'))).not.toContain(caleb)
    expect(users.filter(filterStartsWith('Jo'))).toContain(jonathan)
  })

  it('should match any any field (firstName, lastName, emailAddress)', () => {
    expect(users.filter(filterStartsWith('M'))).toContain(monika)
    expect(users.filter(filterStartsWith('M'))).toContain(kaileen)
    expect(users.filter(filterStartsWith('M'))).not.toContain(jonathan)
    expect(users.filter(filterStartsWith('M'))).not.toContain(chad)
  })

  it('should make case-insensitive matches', () => {
    expect(users.filter(filterStartsWith('ch'))).toContain(chad)
    expect(users.filter(filterStartsWith('ch'))).toContain(chris)
  })

  it('should match specific fields if : separator provided', () => {
    expect(users.filter(filterStartsWith('last:M'))).toContain(kaileen)
    expect(users.filter(filterStartsWith('last:M'))).not.toContain(monika)
    expect(users.filter(filterStartsWith('last:M'))).not.toContain(chad)
  })

  it('should match specific fields case and space insensitive', () => {
    expect(users.filter(filterStartsWith('Last : M '))).toContain(kaileen)
    expect(users.filter(filterStartsWith('Last : M '))).not.toContain(monika)
  })

  it('should match email addresses', () => {
    expect(users.filter(filterStartsWith('email:caleb.'))).toContain(caleb)
  })

  it('should match nothing on an unsupported field name', () => {
    expect(users.filter(filterStartsWith('unsupported:Jon'))).toHaveLength(0)
  })

  it('should match everything on empty field search term', () => {
    expect(users.filter(filterStartsWith('first:'))).toEqual(users)
    expect(users.filter(filterStartsWith('first: '))).toEqual(users)
  })
})
