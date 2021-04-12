const jwt = require('jsonwebtoken');

const userAuthMiddleware = (req, res, next) => {
    try{
        const token = req.header.authorization.split(" ")[1];
        if(!token) return res.status(400).json({message: "No authentication token, access denied"});
        //checking if the token is our custom token or its a google token
        const customToken=token.length<500;
        if(token && customToken){
            jwt.verify(token, "authentication_secret",(err,decoded)=>{
                if(err){
                    return res.status(401).json({msg: "Token verification failed, authorization denied"});
                }
                if(decoded){
                    req.userId = decoded.id;
                }
            });
        }else{
            const decoded=jwt.decode(token);
            req.userId = decoded?.sub;
        }
        next();

    } catch (err) {
        console.log("userAuthMiddleware error")
        res.status(500).json({ error: err.message });
    }
}
module.exports = userAuthMiddleware;