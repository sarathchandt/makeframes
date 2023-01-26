import {} from 'dotenv/config'
import express from 'express';
import path from 'path' ;
import { fileURLToPath } from 'url'
import db from './dbConfig/connection.mjs'



  



//..................

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()


//.....................

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 


// mongoose.set("strictQuery", false);
db.connect()

//  mongoose.connect('mongodb://localhost:27017/makeFrames')









app.listen(3033,()=>{ 
    console.log('sset');
})