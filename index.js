const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const projects = require('./data/schedule.json')
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.biy4zxs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
     try{
          const registrationCollections = client.db('itmSummit').collection('registration');
          const competionCollection = client.db('itmSummit').collection('competition');

          app.get('/registration', async(req, res)=>{
               const query = {}
               const registration = await registrationCollections.find(query).toArray()
               res.send(registration)
          })

          app.get('/competition', async(req, res)=>{
               const query = {}
               const competition = await competionCollection.find(query).toArray()
               res.send(competition);
          })

          app.post('/registration', async(req, res)=>{
               const query = req.body;
               const result = await registrationCollections.insertOne(query)
               res.send(result)
          })

          app.post('/competition', async(req, res)=>{
               const query = req.body;
               const result = await competionCollection.insertOne(query)
               res.send(result);
          })

     }
     finally{

     }
}
run().catch(error => console.error)

app.get('/', async(req, res)=>{
     res.send('server is running')
})

app.get('/schedule', async(req, res)=>{
     res.send(projects)
})

app.listen(port,()=>{
     console.log(`server is running at ${port}`)
})