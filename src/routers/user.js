const bcrypt = require('bcryptjs')
const User = require('../models/users');
const express = require('express');
const { Mongoose } = require('mongoose');
const auth = require('../middleware/auth')
const sharp = require('sharp');
const {sendWelcomeEmail,sendByeEmial} = require('../emails/account');

const router = new express.Router();

router.post('/users/logout',auth,async(req,res) =>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me',auth,async (req,res)=>{
   res.send(req.user);
})

/* we are not gonna use this one as we will not have our id and we already have created a router for this */

// router.get('/users/:id', async (req,res) =>{
//     const _id =req.params.id
//     try{
//         const user = await User.findById(_id)
//         // console.log(user);
//         if (!user) {
//             res.status(404).send();
//         }
//         res.status(200).send(user);
//     }catch(e){
//         res.status(500).send(e)
//     }
// }) 


router.post('/users',async(req,res)=>{

    // const password = req.body.password;
    // console.log(password);
    // req.body.password = await bcrypt.hash(password,8); 
    const user = new User(req.body);
        try{
            await user.save();
            sendWelcomeEmail(user.email,user.name);
            const token = await user.generateAuthToken();
            // await user.save();
            res.status(200).send({user,token});
        }catch(e){
            res.status(400).send(e);
        }
})

router.patch('/users/me', auth ,async(req,res)=>{
        
    const updates  = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send('error Invalid updates..');
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify :false})
        
        // const user = await User.findById(req.params.id)

        const user = req.user;

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        /* actually now we do not need this and as user is already logged in */
        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e);
    }
})
// router.delete('/users/:id',async (req,res)=>{
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         console.log(user);
//         if(!user){
//            return res.status(404).send();
//         }
//         res.send(user);
//     } catch(e){
//         res.status(500).send(e);
//     }
// })

// router.delete('/users/me',auth,async(req,res)=>{
//     try {
//         await req.user.remove();
//         res.send(req.user);
//     } catch (e) {
//         res.status(500).send();
//     }
// })
router.delete('/users/me', auth, async (req, res) => {
    console.log('i am running..')
    try {
        sendByeEmial(req.user.email,req.user.name);
        await req.user.remove();
        console.log(req.user);
        res.send(req.user)
    } catch (e) {
        console.log('but not working..')
        // console.log(req.user.remove());
        res.status(500).send()
    }
})

router.post('/users/login' , async(req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        console.log(user);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch(e){
        // console.log(user);
        res.status(400).send();
    }
});

const multer = require('multer');
const upload = multer({
    // dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload a jpeg or png document..'))
        }
        cb(undefined,true);
    }
})

router.post('/users/me/avatar',auth,upload.single('upload') , async (req,res)=>{
const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
req.user.avatar = buffer;
await req.user.save();
res.send();
},(error,req,res,next) =>{
    res.status(400).send({error:error.message});
})

router.delete('/users/me/avatar',auth, async(req,res) =>{
       
        req.user.avatar = undefined;
        await req.user.save();
        res.send();
    
        // res.status(500).send(e);
    
})

router.get('/users/:id/avatar', async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }
        
        res.set('content-Type','image/png')
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send('sdfs');
    }
})

module.exports = router;