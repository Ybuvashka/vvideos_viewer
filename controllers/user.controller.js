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

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        res.status(400).json({ msg: 'user not found' })
      }
      res.json(user)
      
    } catch (err) {
      console.log(err)
      res.status(400).json({ msg: 'get user error' })
    }
  }

  async getAllUsers(req,res){
    try{
      // let users = await User.find().select('name email')
      const users = await User.find()

      if(!users){
        return res.status(400).json({msg:'users not found'})
      }
      
      res.json({users})

    }catch(err){
      console.log(err);
      res.status(400).json({err:"get all users error"})
    }
  }
}

module.exports = new UserController()