require('../src/db/mongoose')
const User = require('../src/models/users')

// User.findByIdAndUpdate('5c1a5a34d5a2ec046ca8f6bc', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id,age) =>{

    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age})
    return count;
}

updateAgeAndCount('5f79ea3c9d6f2b15949bc647',1).then((count)=>{
    console.log(count);
})