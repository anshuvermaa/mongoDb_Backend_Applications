const mongoose = require('mongoose');
const assert = require('assert');

const User=require('../src/user')
const BlogPost=require('../src/blogpost')

describe('Middleware',()=>{
    let jeo,blogPost;
    beforeEach((done) => {
        jeo=new User({name:'Jeo'})
        blogPost=new BlogPost({title:'JS is great',content:'Yeah you are right it is really is'});
        

        jeo.blogPosts.push(blogPost);
      
        Promise.all([jeo.save(),blogPost.save()])
        .then(()=>done());
    });

    xit('users clean up damgling blogposts on remove',(done)=>{
      jeo.remove()
      .then(()=> BlogPosts.count())
      .then((count)=>{
        assert(count === 0);
         done();
      })
    })


})