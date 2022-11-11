const express=require("express");
const app=express.Router();
const Cart =require("./cart.model");
const authMiddleware=async(req,res,next)=>{
    let token=req.headers.token;
    if(!token){
        return res.send("Missing token")
    };
    
    try {
        let [email,password]=token.split("_#_");
        let user = await User.findOne({ email });
        if (user) {
          if (password === user.password) {
           req.userId=user._id;
           next();
          } else {
            res.status(401).send("Authentication Failure,incorrect password");
          }
        } else {
          res.status(404).send(`User with email:${email} not exist`);
        }
      } catch (e) {
        res.status(404).send(e.message);
      }
}
// app.use(authMiddleware)




app.get("/",async(req,res)=>{


    try{
        // let carts=await Cart.find({user:req.userId}).populate(["product"]);
        let carts=await Cart.find();
        res.send(carts)
    }catch(e){
        res.status(400).send(e.message)
    }
    
})
app.post("/",async(req,res)=>{
    try{
        let cart=await Cart.create({
            ...req.body,
            user:req.userId,
        });
        res.send(cart)
    }catch(e){
        res.status(400).send(e.message)
    }
    
})
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Cart.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (e) {
    res.status(404).send(e.message);
  }
});
module.exports=app;