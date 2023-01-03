const assert = require('assert');
const { default: mongoose } = require('mongoose');
const User=require('../src/user')

describe('creating records', ()=>{
    it('saves a user',(done)=>{
   const jeo=new User({name:'jeo'});
   // since save take some amount of time to save so it  return a promise which we can use
   jeo.save()
   .then(()=>{
    // has jeo saved successfully?
    //when ever object is saved successfully to mongo is new becomes FALSE
    assert(!jeo.isNew)
    done();
   })
   
    })

  
})

