const assert=require('assert');
const User=require('../src/user');

describe('Deleting a user',()=>{
    let jeo;
    beforeEach((done)=>{
        jeo=new User({name:'jeo'});
        jeo.save()
        .then(()=>done());
    })
    it('model instance remove',(done)=>{
       jeo.remove()
       //then when jeo is gone, then try to find  a user with a name of 'jeo'
         .then(()=>User.findOne({name:'jeo'}))
           .then((user)=>{
            // then assert that query did not find a user
            assert(user===null);
            done();
           });
    })
    it('class method remove',(done)=>{
        //Remove a bunch of records with some given criteria
        User.remove({name:'jeo'})
        .then(()=>User.findOne({name:'jeo'}))
           .then((user)=>{
            assert(user===null);
            done();
           });


    })
    it('class method fondAndRemove',(done)=>{
        User.findOneAndRemove({name:'jeo'})
        .then(()=>User.findOne({name:'jeo'}))
        .then((user)=>{
         assert(user===null);
         done();
        });
        

    })
    it(' class method fondbyIdAndRemove',(done)=>{
        User.findByIdAndRemove(jeo._id)
        .then(()=>User.findOne({name:'jeo'}))
           .then((user)=>{
            assert(user===null);
            done();
           });

    })
})