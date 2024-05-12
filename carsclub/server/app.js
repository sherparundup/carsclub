const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config({ path: './config.env' });

require('./database/conn'); 
// const User = require('./models/userSchema');

const corsOptions = {
    options: [
        "http://localhost:4000",
        "http://localhost:4001",
        "http://127.0.0.1:4000",
        "http://127.0.0.1:4001",
        "http://0.0.0.0:4000",
        "http://0.0.0.0:4001",
    ],
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use(require('./router/auth'));
app.use("/uploads",express.static('uploads'));



const PORT = process.env.PORT;




// app.get('/', (req, res) =>{
//     res.send(`Home page`);
// });

// app.get('/about', middleware, (req, res) =>{
//     res.send(`About page`);
// });

// app.get('/contact', (req, res) =>{
//     res.send(`Contact page`);
// });

// app.get('/signin', (req, res) =>{
//     res.send(`Signin page`);
// });

// app.get('/signup', (req, res) =>{
//     res.send(`Signup Page`);
// });



app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})