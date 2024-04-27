import  {MongoClient} from "mongodb"
import  {DEV_CONN_STRX,CONN_STRX,ENV_TYPE} from "./config.js"

const uri = ENV_TYPE == "Development" ? DEV_CONN_STRX : CONN_STRX

const client = new MongoClient(uri)



export const connectDB = async () =>{
    try{
        await client.connect()
    }catch (err) {
        console.error(err.message);
        throw(err)
    }
}

export const getDB =  (dbName)=>{
    return client.db(dbName)
  }

