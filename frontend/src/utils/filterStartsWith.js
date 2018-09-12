/**
 * A startsWith filter maker
 *
 * Provide a search term, and get back a function for use in array.filter().
 * e.g. `Ch` will match Chad Fawcett and Chris Foster, `M` will match
 * Kaileen McCulloch and Monika Piechatzek.
 *
 * You can limit filtering to a specific field (first, last, or email)
 * e.g. `last:M` will ony match on first name.
 *
 * For convenience of the typing user, fields are specified in a shorthand
 * `first`, `last`, `email`
 *
 * This function only supports user objects in this application with properties
 * `firstName`, `lastName`, `emailAddress`
 *
 * if no term is provided it returns a truthy match everything function
 * including field searchs. e.g. `` (empty string) will match all objects.
 * `first:` will also match all objects
 *
 * This only matches the first term provided, everything else is ignored.
 */
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
  // (\w+)? matches the search term (and word character) - also optional
  const parser = /(first|last|email)?\s*:?\s*(\w+)?/i
  const result = parser.exec(text)
  const field = result[1] // (first|last|email)?
  const term = result[2] // (\w+)
  // turn the term into a case insensitive patter
  const pattern = new RegExp('^' + term, 'i')
  return item => {
    let found = false

    if (field) {
      // if there is a field, but no term, match everything
      if (term === '' || !term) return true

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
