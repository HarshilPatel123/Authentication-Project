import mongoose from 'mongoose'

export async function connect(){
    try{
        // mongoose.connect( "mongodb+srv://cluster0.jrhtv33.mongodb.net/--apiVersion 1 --username harshilpatel29072003 --password NKQJ6tV0rWTvwpLa");
        mongoose.connect("mongodb+srv://harshilpatel29072003:NKQJ6tV0rWTvwpLa@cluster0.jrhtv33.mongodb.net/auth")
        const connection = mongoose.connection;


        connection.on('connected', ()=> {
            console.log("MongoDb Connected!!");
            
        })

        connection.on('error', (err: string) => {
            console.log('MongoDb Connection error' + err);
            process.exit(0);
            
        })
        
    }
    catch(error){
        console.log("Error Generated while connecting with database");
        
    }
}