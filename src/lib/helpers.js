const bcrypt = require('bcryptjs')

module.exports = {
  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  },
  matchPassword: async (password, savePassword) => {
    try {
      await bcrypt.compare(password, savePassword)
    } catch (e) {
      console.log(e)
    }
  }
}