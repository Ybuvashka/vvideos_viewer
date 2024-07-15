const User = require('../models/user.model')

class UserController {
  async createUser(req, res) {
    const user = new User(req.body)
    try {
      await user.save()
      return res.status(200).json({ msg: 'user was created' })
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: 'create user error' })
    }
  }

  async getUser(req, res, next, id) {
    try {
      const user = await User.findById(id)
      if (!user) {
        res.status(400).json({ msg: 'user not found' })
      }
      req.profile = user
      next()
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: 'get user error' })
    }
  }
}

module.exports = new UserController()