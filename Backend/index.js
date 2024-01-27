const connectToMongo=require('./db')
connectToMongo();
var cors = require('cors')
 
const express = require('express')
const app = express()
app.use(cors())
const port = 4000

app.use(express.json())

app.use(cors({
  orgin:["https://deploy-mern-1whq.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}))

//Routes
app.use('/',(req,res)=>{
  res.send('app working')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})

