const mongoose = require('mongoose');
const postSchema=require('./post');
const Schema=mongoose.Schema;


const UserSchema=new Schema({
    like:Number,
    name:{
        // there are properties
        type: String,
// making own validations 
// this validate object will return message if validator return false else nothing 
        validate:{
// validation logic
            validator:(name)=> name.length>2,
// messase to return
            message:'name must be longer than two charecters.'
        },

        required: [true,'name is required'],

    },
    posts:[postSchema],


});

// in .get use function not fat arrow function
UserSchema.virtual('postCount').get(function (){
    return this.posts.length;

})


const User=mongoose.model('User',UserSchema);
module.exports = User; 