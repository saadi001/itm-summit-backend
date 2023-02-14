const express = require('express');
const cors = require('cors');
const app = express()
const projects = require('./data/schedule.json')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


app.get('/', async(req, res)=>{
     res.send('server is running')
})

app.get('/schedule', async(req, res)=>{
     res.send(projects)
})

app.listen(port,()=>{
     console.log(`server is running at ${port}`)
})