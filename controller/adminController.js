import User from "../models/User.js";

  const getAllusers = async(req,res)=>{
    try {
         const users =await  User.find({}, {password:0})
    res.status(200).json(users)
    } catch (err) {
        res.json({message:err.message}); 
    }
  }


  export default getAllusers;