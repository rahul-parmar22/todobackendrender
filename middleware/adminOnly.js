
const adminOnly = (req,res,next)=>{
   !req.user || req.role !== 'admin' ?res.status(403).json({message:'only admin can access this route'}) 
    :next();  
};
export default adminOnly; 
