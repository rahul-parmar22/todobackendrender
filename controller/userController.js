import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {

     console.log("requested body:", req.body);
    const { username, password } = req.body;
    const user = new User({ username, password }); //schema aavu expect karto hoy usrname and password etale e automatic set kari de..aa key ruep kam kare and aani value value ma set thai jay
    await user.save();
                        // ahi niche je  aa chhe { id: user._id } e aa object jyare token verify thay auth middleware ma tyare aa object tya male aakho..
    const token = jwt.sign({ id: user._id , role:user.role}, process.env.JWT_SECRET, {
      //const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, user, message:"User register sucessfully..!" });
  } catch (err) {
    res.status(400).json({ err: err.message, message:"User already exists..!" });
  }
};

const login = async (req, res) => {
  try {  //try catch block scope hoy..jo aama andar haji 2-3 try catch use karya hoy e janva mate ke kya part ma error chhe to ema define variabel ne pachhi niche no use kari shako tame..block scope hoy e
    const { username, password } = req.body;
    const user = await User.findOne({ username});  //{ username }   // same as { username: username }  to ahi pan aavi rite kari kari shako..jo bahar alag field thi avti hoy key to aavi rite kari shakay..je uapr registseration ma joyu em


    if (!user || !(await user.compare(password))) {      
         res.status(400).json({error:"Invalid credentials"}); 
         } 


    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({token:token, message:"user login", role:user.role, username:user.username});    //ahi mare messaeg and token banne mokalvu hoy to ek obj ma bane nakhi devana pan res.json ke pachhi kai pan res ek var send thai gyo etale puru...error nahi aave pan  warning aavshe ane first res hoy e send thay....      
    
    console.log("successful ho gya banda login")
  } catch (err) {
    res.status(400).json({err:err.message});
  }
};

export { register, login };

