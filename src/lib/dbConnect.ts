import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI || '', {})
       connection.isConnected = db.connections[0].readyState

       console.log('MongoDB URI:', process.env.MONGODB_URI);
       console.log("Db connected sucessfully");

    } catch (error) {
        
        console.log("Database connection is failed", error);
        console.log('MongoDB URI: 12', process.env.MONGODB_URI);
        

        process.exit(1)
    }
}

export default dbConnect