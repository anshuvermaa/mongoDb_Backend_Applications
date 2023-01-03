const assert=require('assert');
const User = require('../src/user');



describe('validation',()=>{
    it('require a user name',()=>{
       const user=new User({name: undefined});
       const validationResult=user.validateSync();
       const {message} = validationResult.errors.name;
       assert(message==='name is required')
    }) ;
    it('require a user\'s name longer than 2 charectors',()=>{
       const user=new User({name: 'An'});
       const validationResult=user.validateSync();
       const {message} = validationResult.errors.name;
       assert(message==='name must be longer than two charecters.')
    }) ;
    it('disallows invalid records from being saved',(done)=>{
        const user=new User({name:'An'});
        user.save()
        .catch((validationResults)=>{
            const message=validationResults.errors.name

            assert(message=='name must be longer than two charecters.');
            done()
        })
    })

})   