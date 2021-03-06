const Task = require('../models/tasks');
const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/users');

router.get('/tasks',auth, async (req, res) => {
   
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }
   
    try {
        // const tasks = await Task.find({})

        const ownerId = req.user._id;
        const user = await User.findById(ownerId);
        await user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            },
           
        }).execPopulate();
        // console.log(user.tasks);
        console.log(sort);

        res.status(200).send(user.tasks);
    } catch (e) {
      res.status(400).send();
    }
})

router.get('/tasks/:id', auth , async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
       
        const task = await Task.findOne({_id, owner:req.user._id});
       
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send();
    }
})
router.post('/tasks',auth,async (req, res) => {
    // const task = new Task(req.body);
  
    const task =  new Task({
        ...req.body,
        owner: req.user._id
    }) 
  console.log(task);
    try {
        await task.save();
        res.status(200).send(task);
    } catch (e) {
        console.log(e);
    }
})

router.patch('/tasks/:id',auth ,async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send('error Invalid updates..');
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new:true, useFindAndModify: false })
        
        // const task = await Task.findById(req.params.id);

        const task = await Task.findOne({_id:req.params.id , owner:req.user._id});
      
        if (!task) {
            res.status(200).send();
        }
        updates.forEach((update)=>task[update] = req.body[update]);
        await task.save();

        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete('/tasks/:id', auth,async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id:req.params.id , owner: req.user._id});
      
        console.log(task);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

// task.save().then((req,res)=>{
//     console.log(task);
//     res.send(task);
// }).catch((error)=>{
//     res.status(400).send(error);
// })


module.exports = router;