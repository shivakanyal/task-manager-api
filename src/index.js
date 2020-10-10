require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter  = require('./routers/task');
const Task = require('./models/tasks');
const app = express();

const port  = process.env.port

// const multer = require('multer');
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a word document..'))
//         }
//         cb(undefined,true);
//     }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     console.log('i am running...')
//     res.send();
// },(error,req,res,next) =>{
//     res.status(400).send({error:error.message});
// })
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// app.use((req,res,next) =>{
//     res.send('site is in maintainance..');
// })
// app.post('/users',(req,res)=>{
//     const user = new User(req.body);
//     user.save().then((req,res) =>{
//         console.log(user);
//         res.send(user);
//     }).catch((error)=>{
//         res.status(400);
//         res.send(error);
//     })
// });



app.listen(port,()=>{
    console.log('Server is running at port '+port);
})

// const Task =require('./models/tasks')
// const User =require('./models/users')
// const main = async () =>{

//     // const task = await Task.findById('');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);

//     const user = await User.findById('5f7fddaa60a3682d1098c5c5');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }


// main();