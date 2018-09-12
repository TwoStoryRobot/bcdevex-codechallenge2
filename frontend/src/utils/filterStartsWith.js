function filterStartsWith(text) {
  // no text provided is a match everything function, or always return true
  if (text === '' || !text) {
    return () => true
  }

  const pattern = new RegExp('^' + text, 'i')
  return item => {
    const found =
      item.firstName.match(pattern) ||
      item.lastName.match(pattern) ||
      item.emailAddress.match(pattern)
    return found
  }
}

export default filterStartsWith
