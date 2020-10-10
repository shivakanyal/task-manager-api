const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';


MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true} , (error,client) =>{
    if(error){
        return console.log('unable to connect to database');
    }
    
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:'shiva',
    //     age:27
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:'learn mongodb',
    //         completed:false
    //     },
    //     {
    //         description:'start learning soft skills',
    //         completed:true
    //     }
    // ],(error,result) =>{
    //     if(error){
    //         return console.log('unable to insert documents!');
    //     }
    //     console.log(result.ops);
    // })

//     db.collection('users').insertMany([
//         {
//             name:'rishabh',
//             age:22
//         },
//         {
//             name:'utkarsh',
//             age:22
//         }
//     ],(error,result) =>{
//         if(error){
//             return console.log('Unable to insert documents!')
//         }
//         console.log(result.ops);
//     })
    // db.collection('tasks').findOne({_id: new ObjectID("5f7585042bbecb63245ce2a7")},(error,task)=>{
    //     console.log(task);
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    //       console.log(tasks);
    //    })

    // db.collection('users').updateOne({_id: ObjectID('5f7582f45e0120307c21b996')},{
    //     $set:{
    //         age:22
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error) =>{
    //     console.log(error);
    // })
    // db.collection('tasks').updateMany({completed:false},{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })


    db.collection('tasks').deleteOne({description:'learn mongodb'}).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error);
    })



})