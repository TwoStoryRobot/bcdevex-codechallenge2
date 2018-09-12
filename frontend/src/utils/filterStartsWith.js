function filterStartsWith(text) {
  if (text === '' || !text) {
    return () => true
  }

  const pattern = new RegExp('^' + text)
  return item => {
    return item.firstName.match(pattern)
  }
}

export default filterStartsWith
