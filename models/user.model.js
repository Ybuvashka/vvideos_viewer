const { Schema, model } = require("mongoose");
const crypto = require('crypto');
const { USER_ROLE } = require("../utils/constants");

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    required: "Email is required",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role:{
    type: String,
    enum: Object.values(USER_ROLE),
    default:USER_ROLE.USER
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = this.password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  // if (this.isNew && !this._password) {
  //   this.invalidate("password", "Password is required ");
  // }
}, null);

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  },
  makeSalt:function(){
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
};

module.exports = model('User', UserSchema)
