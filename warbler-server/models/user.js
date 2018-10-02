const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

userSchema.pre('save', async function (next) {
try{
    if (!this.isModified('password')){
        return next();
    }
    let hashpassword = await bcrypt.hash(this.password, 10);
    this.password = hashpassword;
    return next();
} catch(err){
return next(err);
}

});
userSchema.method.comparePassword = async function (condidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(condidatePassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
};
const User = mongoose.model('User',userSchema);
module.exports = User;