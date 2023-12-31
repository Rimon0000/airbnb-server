const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

// console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wp3p5wr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();


    const serviceCollection = client.db("airbnb").collection("services")

    //all services
    app.get("/allServices", async(req, res) =>{
      const result = await serviceCollection.find({}).toArray()
      res.send(result)
    })

    //category
    app.get("/allServices/:text", async(req, res) =>{
      console.log(req.params.text)
      if(req.params.text == "Rooms" || req.params.text == "Countryside" || req.params.text == "Tropical" || req.params.text == "New" || req.params.text == "Cabins" || req.params.text == "Beach"){
        const result = await serviceCollection.find({subcategory: req.params.text}).toArray()
        res.send(result)
        return
      }
      const result = await serviceCollection.find({}).toArray()
      res.send(result)
    })

    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Airbnb is running!')
})

app.listen(port, () => {
  console.log(`Airbnb is running on port: ${port}`)
})