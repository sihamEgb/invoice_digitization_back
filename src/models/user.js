const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },  
});

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bctypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}
// hash the plain text password before saving
userSchema.pre('save'), async function (next) {
    const user = this
    console.log('just before saving');
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
}
const User = mongoose.model('User', userSchema);
module.exports = User