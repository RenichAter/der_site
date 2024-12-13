const mongoose = require("mongoose");
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
	family: String,
	city: String,
	username: String,
	mail: String,
	password: String,
});

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();
  
	const salt = crypto.randomBytes(16).toString('hex'); // Генерация соли
	const hash = crypto.createHash('sha256').update(this.password + salt).digest('hex');
	this.password = `${salt}:${hash}`; // Сохраняем соль и хэш вместе
	next();
  });

const User = mongoose.model("user", UserSchema)

module.exports = User;
