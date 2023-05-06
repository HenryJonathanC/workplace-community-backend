const User = require('../schema/user')
const router = require('express').Router()
const CryptoJS = require('crypto-js')


//post methods
//signup
router.post('/SignUp', async(req, res)=>{
    const userData = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString()
    })
    try {
        const user = await userData.save();
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})

router.get('/SignUp', async(req, res)=>{
    const user = await User.find();
    res.json(user)
})

//login
// router.post('/Login', async(req, res)=>{
//     try{
//         const user = await User.findOne({ email: req.body.email })
//         !user && res.status(401).json('Wrong password or username')

//         const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
//         const origPassword = bytes.toString(CryptoJS.enc,Utf8)

//         origPassword!== req.body.password && res.status(401).json("Wrong password or username")
        
//         const {password, ...other} = user._doc;
//         res.status(200).json()
//     } 

//     catch{
//         res.status(500).json(err)
//     }
// })

module.exports = router;