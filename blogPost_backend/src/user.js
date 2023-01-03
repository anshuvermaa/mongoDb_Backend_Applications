const mongoose = require('mongoose');
const postSchema=require('./post');
const Schema=mongoose.Schema;


const UserSchema=new Schema({
    like:Number,
    name:{
        type: String,
        validate:{
            validator:(name)=> name.length>2,
            message:'name must be longer than two charecters.'
        },

        required: [true,'name is required'],

    },
    posts:[postSchema],
    blogPosts:[{
        type:'ObjectId',
        ref:'blogPost'
    }]


});

// in .get use function not fat arrow function
UserSchema.virtual('postCount').get(function (){
    return this.posts.length;

})
UserSchema.pre('delete',function(next){
    const BlogPost=mongoose.model('blogPost');
    // this ===jeo this referes to instance of object
    // $in says go to blogPOst records see for ID in if id is in the proceed  
    BlogPost.remove({_id:{$in: this.blogPosts}})
    .then(()=> next());
    // if its done go to next mongoose  midleware
})


const User=mongoose.model('user',UserSchema);
module.exports = User; 