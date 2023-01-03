const mongoose = require('mongoose');
const User= require('../src/user');
const Comment= require('../src/comment');
const BlogPost= require('../src/blogpost');



describe('Associations',()=>{
    let jeo,blogPost,comment;
    beforeEach((done) => {
        jeo=new User({name:'Jeo'})
        blogPost=new BlogPost({title:'JS is great',content:'Yeah you are right it is really is'});
        comment=new Comment({content:'Congrate on great post'})

        jeo.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user=jeo;
      
        Promise.all([jeo.save(),blogPost.save(),comment.save()])
        .then(()=>{done()});
    });
// here we checking if we can access blogpost and comments with accessing user
    it('saves a relation between a user and a blogpost',(done)=>{
        User.findOne({name:'Jeo'})
        .populate({
            path:'blogPosts',
            model:'blogpost',
            populate:{
                path:'comments',
                model:'comment',
                populate:{
                    path:'user',
                    model:'user',

                }
            }
        })
         .then((user)=>{
            console.log(user.blogPosts[0].comments[0]);
            done();
        });
    });
   
});