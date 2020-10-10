const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology:true
})


// const me = new User({
//     name:'shiva',
//     age:21,
//     email:'kanyalshiva1@gmail.com'
// })

// me.save().then(() =>{
//     console.log(me)
// }).catch((error) =>{
//     console.log('Error!',error)
//  })

// const Aman = new User({
//     name:'Aman',
//     email:'amansingh@gmail.com',
//     age:22,
//     password:'1223123123'
// })

// Aman.save().then(()=>{
//     console.log(Aman)
// }).catch((error)=>{
//     console.log('Error!',error);
// })

// const task2 = new task({
//     // description:'learn mongoose',
//     // completed:false
// })

// task2.save().then(()=>{
//     console.log(task2)
// }).catch((error) =>{
//     console.log('Error!',error);
// })
