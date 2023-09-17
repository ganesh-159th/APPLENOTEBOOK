const connectToMongo = require('./db');

const express = require('express')
connectToMongo();
const app = express()
const port = 8000
app.use(express.json())
//available routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello World! ganesh')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


