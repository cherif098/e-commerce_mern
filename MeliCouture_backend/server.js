import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';


// App config 
const app = express();
const port = process.env.PORT  || 3000 ;



// connexion to database
try {
    await connectDB();
} catch (error) {
    console.error('Impossible de démarrer l\'application:', error);
    process.exit(1);
}


// connection to cloudinary 
connectCloudinary()


// Middlewares 
app.use(express.json());
app.use(cors());


// Api endpoints 

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('api is running')
})


// Start server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})