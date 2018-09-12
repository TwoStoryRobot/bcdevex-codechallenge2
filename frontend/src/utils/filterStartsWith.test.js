import filterStartsWith from './filterStartsWith'

describe('filterStartsWith', () => {
  it('should return a function', () => {
    expect(typeof filterStartsWith('partial')).toBe('function')
  })
})
