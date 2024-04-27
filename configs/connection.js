const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.CONN_STRX;

const client = new MongoClient(uri);

const main = async () => {
    try {
        await client.connect();
      } catch(err) {
          console.error(err)
      }finally{
        await client.close();
      }      
}
