const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//몽고스 스키마로 모델 설계
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true, //한개만 가능
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});

//비밀번호 암호화 salt 돌리고 hash함수로 암호화
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect Email");
};

module.exports = mongoose.model("Users", userSchema);
