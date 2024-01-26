const connectToMongo=require('./db')
connectToMongo();
var cors = require('cors')
 
const express = require('express')
const app = express()
app.use(cors())
const port = 4000

app.use(express.json())

//Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})

