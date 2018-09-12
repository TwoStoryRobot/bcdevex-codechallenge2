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

  it('should match any text field (firstName, lastName, emailAddress)', () => {
    expect(users.filter(filterStartsWith('Cha'))).toContain(chad)
    expect(users.filter(filterStartsWith('Cha'))).not.toContain(chris)
  })

  it('should return a truthy function if no text provided', () => {
    expect(users.filter(filterStartsWith(''))).toEqual(users)
  })
})
