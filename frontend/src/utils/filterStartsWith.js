function filterStartsWith(text) {
  if (text === '' || !text) {
    return () => true
  }

  return item => {
    return item.firstName == 'Chad'
  }
}

export default filterStartsWith
