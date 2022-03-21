//required modules
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';


//server routes
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


app.use('/posts', postRoutes)
app.use('/users', userRoutes)


app.get('/', (req, res) => {
    res.send('hello from ultima lectio api')
})

const PORT = process.env.PORT || 5000;

mongoose.connect((process.env.CONNECTION_URL))
 .then(() => app.listen(PORT, () => console.log("server running on port: 5000")))
 .catch((error) => console.log(error.message));