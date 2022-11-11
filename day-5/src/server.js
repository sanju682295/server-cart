require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const connect=require("./config/db")
const PORT=process.env.PORT;
const cartRoute=require("./features/cart/cart.route")

app.use(express.json())
app.use(cors());
app.use("/carts",cartRoute)

app.listen(PORT,async()=>{
await connect();
console.log(`listening to http://localhost:${PORT}`)
})