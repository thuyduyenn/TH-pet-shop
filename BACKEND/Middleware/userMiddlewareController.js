const jwt = require("jsonwebtoken")
const userMiddlewareController = {
      //verifyToken
      verifyToken: (req,res,next)=> {
        const token = req.headers.token
        if(token){
           const accessToken = token.split(" ")[1]
           jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,user)=> {
                 if(err){
                    console.log(err)
                    return  res.status(403).json("Token is not valid");
                 }
                 req.user = user;
                 next();
           })
        }else {
              res.status(401).json("You're not authenticated")
        }
      },
      verifyTokenAndAdminAuth: (req,res,next) => {
        userMiddlewareController.verifyToken(req,res,()=> {
                if((req.user._id == req.params.deleteId) || req.user.isAdmin == "true"){
                     next();
                }else {
                    return   res.status(403).json("You're not allowed to delete other")
                }
        })
      }

}
module.exports = userMiddlewareController