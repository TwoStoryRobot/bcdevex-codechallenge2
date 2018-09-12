const sendMail = jest.fn()
const createTransport = () => ({
  sendMail
})

export default { createTransport, sendMail }
