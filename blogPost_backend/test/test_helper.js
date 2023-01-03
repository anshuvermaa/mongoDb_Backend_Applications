const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
            .once('open',()=> console.log('Good To Go!'))
            .on('error',(error)=>{
                console.warn('Error',error);
            })

beforeEach((done)=>{
    //sequentially we are dropping collections
    // mongoose normalises every collection name to small case
    // so here boloPost is not correct
    const {users,comments,blogposts}=mongoose.connection.collections;
        users.drop(()=>{
            comments.drop(()=>{
                blogposts.drop(()=>{
                    done();
                })
            })
        })
    
    })
    