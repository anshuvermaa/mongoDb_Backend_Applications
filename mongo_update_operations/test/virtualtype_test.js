const assert=require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of post',(done)=>{
        const jeo=new User({
            name:'jeo',
            posts:[{title:'Post title'},{title:'new post'}]
        });
        jeo.save()
        .then(()=> User.findOne({name:'jeo'}))
        .then((user)=>{
            assert(jeo.postCount===1)
        })
        done();
    })

})