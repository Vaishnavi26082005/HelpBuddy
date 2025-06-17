import jwt from "jsonwebtoken"
import config from "../config.js"
function userMiddleware(req,res,next){
    const authHeader=req.headers.authorization
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors:"NO TOKEN PROVIDED"})
    }
    const token =authHeader.split(" ")[1];
    try {
        
       const decode= jwt.verify(token,config.JWT_SECRET)
       console.log(decode);
       req.userId=decode.id;

       next()

          
    
    } catch (error) {
        return res.status(401).json({errors:"Invalid Token"})
        
    }

}
export default userMiddleware;