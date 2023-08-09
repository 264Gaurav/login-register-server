const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://gauravsingh264209:k3XZZVsnSoZwWFpJ@cluster0.rqa17k9.mongodb.net/loginDB" , {
    useNewUrlParser:true,
    useUnifiedTopology:true 
})
.then(()=>console.log("DB connected Successfully."))
.catch((err)=>console.log("Error while connecting DB."))



//model and schema
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User=new mongoose.model("User",userSchema);



app.post("/register" , async (req,res)=>{
    //console.log(req.body);
    const {name,email,password}=req.body;  //extract user data
            //check if user already exist
            const existUser=await User.findOne({email:email}); // DB interaction 
            console.log(existUser);
            if(existUser){
                return res.status(400).json({
                        success:false ,
                        message:'User Already exists',
                    });
            }
            //else the user is a new user 

            //create  new entry i.e., signup User 
            const user= User.create({    //DB interaction 
                name,email,password     //create entry with updated password 
            })

            console.log(user);
            return res.status(200).json({
                status:true,
                message:'User registered successfully',
            });
 })


 app.post("/login" , async(req,res)=>{
    //console.log(req.body);
    const {email,password}=req.body;  //extract user data
            //check if user exist
            const user=await User.findOne({email:email}); // DB interaction 
            // console.log(user);
            if(user){
                //now check passowrd entered by user and password storedd in Db
                if(password===user.password){
                    console.log({message:"Login Successfully" , user : user})
                    res.send({message:"Login Successfully" , user : user})
                }
                else{
                    res.send({message:"Password didn't match, Enter correct password."})
                }
            }
            else{
                res.send({message:"User is not reistered "})
            } 
 })

app.listen(4000,(req,res)=>{
    console.log("Server started at port : 4000")
})
