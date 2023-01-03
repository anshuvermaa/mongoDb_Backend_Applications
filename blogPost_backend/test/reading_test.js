const assert=require('assert');
const User=require('../src/user');

describe('Reading user out of database',()=>{
    let jeo,maria,alex,zach;
    // since finding the user name of jeo we have to make sure first that we have user name of jeo
  beforeEach((done)=>{
     jeo =new User({name:'Jeo'});
     maria =new User({name:'Maria'});
     alex =new User({name:'Alex'});
     zach =new User({name:'Zach'});
    Promise.all([jeo.save(),maria.save(),alex.save(),zach.save()]) 
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
    });
    it('can limit and skip the result set',((done)=>{
        User.find({})
        // sort users in assending order for deceanding name:-1
        .sort({name:1})
        .skip(1)
        .limit(2)
        .then((user)=>{
      console.log(user);
      done()
        })


    }))
});