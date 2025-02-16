import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/db.js";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.on("error",()=>{
        console.log("Somenthing went wrong,after connecting the database successfully");
        
    })
    app.listen(PORT,()=>{
        console.log(`The server is listening at ${PORT}`);
        
    })

})
.catch((error)=>{
    console.log("Something went wrong at database connection,index.js",error);
    

})









