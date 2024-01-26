const mongoose=require('mongoose');
const mongoURL='mongodb+srv://aayush191102:Aayush1911@cluster0.ixqsot4.mongodb.net/iNotebook'

const connectToMongo=()=>{
        mongoose.connect(mongoURL)
        console.log("Connected to mongoose Sucessfully")
}

module.exports=connectToMongo;
