const assert=require('assert');
const User=require('../src/user');

describe('Updating a user',()=>{
    let jeo;
    beforeEach((done)=>{
        jeo=new User({name:'jeo'});
        jeo.save()
        .then(()=>done());
    })


    function assertName(operation,done){
        operation
        .then(()=>User.find({})) 
        .then((users)=>{
           console.log(users);
           assert(users.length===1);
           assert(users[0].name==='Alex');
           done();

        });

    }
    it('Instance set and save',(done)=>{
        // set only change in memory not in database and
        //to save in database u have to save 
        jeo.set('name', 'Alex');
       assertName(jeo.save(),done)
       
    });
    it('A model instance can update',(done)=>{
        assertName(jeo.update({name:'Alex'}),done)
    })
    it('A model class can update',(done)=>{
        assertName(User.update({name:'jeo'},{name:'Alex'}),done)
        
    })
    it('A model class can update one record',(done)=>{
        assertName(User.findOneAndUpdate({name:'jeo'},{name:'Alex'}),done)
        
     })
    it('A model class can can find a record with an ID and update',(done)=>{
        assertName(User.findByIdAndUpdate(jeo._id,{name:'Alex'}),done)
        
     })
})