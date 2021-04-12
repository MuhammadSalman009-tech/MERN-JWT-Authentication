const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const cors=require("cors");

const UserRoutes =require("./Routes/UserRoutes");


const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT|| 5000;


//Connection to MongoDB  
const CONNECTION_URL="mongodb+srv://MuhammadSalman:salman009@cluster0.peuiq.mongodb.net/javascriptMastery?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//Listening to server Server
.then(()=>app.listen(PORT,()=>console.log("Serving at http://localhost:"+PORT)))
.catch(error=>console.log("Database Connection Failed "+error));

//Handling Routes
app.use('/user',UserRoutes);

