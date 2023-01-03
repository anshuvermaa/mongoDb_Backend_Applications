const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
            .once('open',()=> console.log('Good To Go!'))
            .on('error',(error)=>{
                console.warn('Error',error);
            })

// beforeEach is a hook is going to run before each test
beforeEach((done)=>{
    // sortcut way to reference user collection on the data base
        mongoose.connection.collections.users.drop(()=>{
            // Ready to run next test
            done();
        })
    
    })
    