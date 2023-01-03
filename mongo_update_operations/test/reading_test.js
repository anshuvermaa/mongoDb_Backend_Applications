const assert=require('assert');
const User=require('../src/user');

describe('Reading user out of database',()=>{
    let jeo;
    // since finding the user name of jeo we have to make sure first that we have user name of jeo
  beforeEach((done)=>{
     jeo =new User({name:'Jeo'});
     jeo.save()
     .then(()=>{
    //as soon as user is saved we call a done callback
        done();
     });
  })
    it('finds all users with the name of jeo',(done)=>{
     User.find({name:'Jeo'})
     .then((users)=>{
         assert(users[0]._id.toString()==jeo._id.toString());
         console.log(users);
   done();
     })
    });
    it('find a user with a perticular id',(done)=>{
        User.findOne({_id: jeo._id})
        .then((user)=>{
            assert(user.name==='Jeo');
            done();
            
        })
    })
});