const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

class AuthController {

  async register(req,res){
    const user = await User.create(req.body)
    res.status(201).json({user})
  }

  async signin(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!user.authenticate(req.body.password)) {
        return res.status(401).send({ error: 'Password and email do not match' });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const oneDay = 1000 * 60 * 60 * 24;

      res.cookie('t', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + oneDay)
      });

      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      return res.status(401).json({ err: 'could not sign in' })
    }
  }

  async signout(req, res) {
    res.clearCookie('t')
    return res.status(200).json({ message: 'signed out' })
  }

  async requireSignin() {
    return expressJwt({
      secret: process.env.JWT_SECRET,
      userProperty: 'auth',
    })
  }
}
module.exports = new AuthController()
