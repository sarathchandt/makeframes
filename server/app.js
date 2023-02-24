import {} from 'dotenv/config'
import express from 'express';
import path from 'path' ;
import { fileURLToPath } from 'url'
import db from './dbConfig/connection.mjs'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'



//.......................        
  
import userRoutes from './routes/user.mjs';



//..................

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()



//.....................
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true,  parameterLimit: 50000 })); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors({ 
    origin:['http://localhost:8000'],
    method:['POST', 'GET', 'PUT', 'DELETE','PATCH'],
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Access'
    ]
}))  



// mongoose..............
db.connect()


//.......................

app.use('/user',userRoutes);






app.listen(3033,()=>{ 
    console.log('sset');
})