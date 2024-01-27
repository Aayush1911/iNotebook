const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const mongoURL=process.env.MONGOURL

const connectToMongo=()=>{
        mongoose.connect(mongoURL)
        console.log("Connected to mongoose Sucessfully")
}

module.exports=connectToMongo;
