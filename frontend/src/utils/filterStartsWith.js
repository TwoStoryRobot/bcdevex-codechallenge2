function filterStartsWith(text) {
  // no text provided is a match everything function, or always return true
  if (text === '' || !text) {
    return () => true
  }

  const fieldMap = {
    first: 'firstName',
    last: 'lastName',
    email: 'emailAddress'
  }
  // look for things like 'first:jon' where field is optional
  // (first|last|email)? optionally matches the specific field
  // \s*:?\s* optionally matches ' : ' with any number of spaces
  // (\w+) matches the search term (and word character)
  const parser = /(first|last|email)?\s*:?\s*(\w+)/i
  const result = parser.exec(text)
  const field = result[1] // (first|last|email)?
  const term = result[2] // (\w+)
  // turn the term into a case insensitive patter
  const pattern = new RegExp('^' + term, 'i')
  return item => {
    let found = false

    if (field) {
      // look up the field name (case insentively)
      const fieldName = fieldMap[field.toLowerCase()]
      found = item[fieldName].match(pattern)
    } else {
      // no field specified, match on anyfield
      found =
        item.firstName.match(pattern) ||
        item.lastName.match(pattern) ||
        item.emailAddress.match(pattern)
    }
    return found
  }
}

export default filterStartsWith
