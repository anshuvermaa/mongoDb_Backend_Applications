const assert=require('assert');
const User=require('../src/user');

describe('Subdocumnets',()=>{
    it('can create a document',(done)=>{
      const jeo=new User({
        name:'jeo',
        posts:[{title:'postTitle'}]
    });
    jeo.save()
    .then(()=> User.findOne({name:'jeo'}))
    .then((user)=>{
        assert(user.posts[0].title==='postTitle');
        done()
    })
    });
    it('can add subdocumnets to an existing record',(done)=>{
        const jeo=new User({
            name:'Jeo',
            posts:[],
        });
        jeo.save()
        .then(()=> User.findOne({name:'Jeo'}))
        .then((user)=>{
            user.posts.push({title:'new post'});
           return user.save();
           })
           .then(()=>User.findOne({name:'Jeo'}))
           .then((user)=>{
               assert(user.posts[0].title==='new post');
               done()
           })
    })
    it('can remove an existing subdocumnets',(done)=>{
        const jeo=new User({
            name:'Jeo',
            posts:[{title:'new post'}],
        });
        jeo.save()
        .then(()=> User.findOne({name:'Jeo'}))
        .then((user)=>{
           const post=  user.posts[0];
           post.remove();
           return user.save();
           })
           .then(()=>User.findOne({name:'Jeo'}))
           .then((user)=>{
               assert(user.posts.length===0);
               done();
           })
    })

    
})