function validateEmail(email) {
  /* Regular expression to validate emails
   * Only alpha-numeric characters (upper and lower), periods, underscores, pluses and
   * hyphens allowed before the @. After the @, the same is allowed excluding
   * underscores and pluses. Then a final period followed by at least 2 alpha-numeric
   * characters
   */
  const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}

export default validateEmail
