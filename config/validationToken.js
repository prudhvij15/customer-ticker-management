const jwt = require('jsonwebtoken')



const authenticationUser=async(req,res,next)=>{

    const token=req.headers.authorization
    if (!token){
        return res.status(401).json({message:"UnAuthorized"})
    }
    else{
        try{
            //send the bearer token in headers without codes ("")
            const decoded= jwt.verify(token.split(" ")[1],process.env.ACCESS_STRING_TOKEN)
            req.user=decoded.user
            
            next();

        }catch{
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

module.exports=authenticationUser