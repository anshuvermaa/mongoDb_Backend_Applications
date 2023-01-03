const Driver=require('../models/driver')
module.exports ={
    // ES6
    greeting(req, res){
        res.send({hi:'there'})
        

    },


    
index(req, res, next){ 
    // everything after the ? is qyery string
    // http://google.com?lng=80&lat=20
        const {lng,lat}=req.query;
        Driver.geoNear(
            {type:'point',coordinates:[lng,lat]},
            { spherical:true,maxDistance:200000}
        )
        .then(drivers=>
            res.send(drivers))
            .catch(next);
    
    },
//  // ES5
//     greeting: function(req, res){

//     }
create(req, res,next){
   const driverProp=req.body;
// creating driver with the help of express
   Driver.create(driverProp)
   .then(driver=>res.send(driver))
   .catch(next)
},

edit(req, res, next){
    const  driverId=req.params.id;
    const driverProp=req.body;
// this method of updating  doesnt call with the driver which was updated
//so u have to first find object which is updated then send it back
    Driver.findByIdAndUpdate({_id: driverId}, driverProp)
    .then(()=>Driver.findById({_id:driverId}))
    .then(driver=> res.send(driver))
    .catch(next);


},
delete(req, res, next){
    const driverId=req.params.id;
    Driver.findByIdAndRemove({_id: driverId})
    .then((driver)=> res.status(204).send(driver))
    .catch(next);

},

}