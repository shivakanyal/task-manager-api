require('../src/db/mongoose')
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete('5c1a63e8f0d4c50656c5ab28').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// Task.findByIdAndDelete('5f79dfda201e925bec0459e6').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:true})
// }).then((count)=>{
//     console.log(count);
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async (id) =>{
    const deletedTask =await Task.findByIdAndDelete(id);
    console.log(deletedTask);
    const count = Task.countDocuments({completed:false});
    return count;
}

deleteTaskAndCount('5f79dfda201e925bec0459e6').then((count)=>{
  console.log(count);  
});