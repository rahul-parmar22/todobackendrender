import jwt from "jsonwebtoken";

const auth = (req, res, next) => {      
    const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "invalid token aa gya hai ji" });

  
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {  
        if (error) return res.status(401).json({ error: "Invalid Token " });
    req.user = decoded.id; 
        req.role = decoded.role; 
            next();  
            });
};

export default auth;
