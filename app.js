const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./router/userRouter.js')

//configs
const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err=> console.log(err.message))

//routes
app.get('/', (req, res)=> {
    res.send('Hello World! This is the first page')
})

app.use('/auth', userRouter)


//listening on http://localhost/3001
app.listen(3001, ()=> console.log('Listening on port 3001'))