const userModel = require("../models/user")
const tokenModel = require("../models/token")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")


const createToken = (data) => {
        const jwtKey = process.env.JWT_SECRET_KEY
        return jwt.sign(data,jwtKey,{ expiresIn: "50s"})
}
const createRefreshToken = (data) => {
   const jwtKey = process.env.JWT_SECRET_REFRESH_KEY
   return jwt.sign(data,jwtKey,{ expiresIn: "365d"})
}
let refreshTokens = []
const registerUser = async(req,res) => {
   const {avatar,name,email,phone,password,valid} = req.body
   try {
      let user = await userModel.findOne({email})
      if(user) return res.status(400).json("User with the riven email already exist ....")
      if(!name || !email || !phone || !password || !valid) return res.status(400).json("All field are required")
      if(!validator.isEmail(email)) return res.status(400).json("Email must be is valid email")
      if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong password")
      if(avatar){
         user = new userModel({
            avatar: ({url: "https://res.cloudinary.com/doquwihm4/image/upload/v1699196711/UserPetShop/user-removebg-preview_mq8msw.png"}),
            name,
            email,
            phone,
            password,
            isAdmin:false,
            valid
         })
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(user.password,salt)
         user.avatar =  await cloudinary.uploader.upload(avatar,{
            upload_preset: "UserPetShop"
         })
         await user.save();
         const data = {
                _id:user._id,
                isAdmin:user.isAdmin
         }
         const token = createToken(data)
         const refreshToken = createRefreshToken(data)
         const tokenData = new tokenModel({
                  idUser:user._id,
                  token:token,
                  refreshToken:refreshToken
         })
         await tokenData.save()
         res.status(200).json({
            _id:user._id,
            avatar:user.avatar,
            name,
            email,
            isAdmin:false,
            valid,
            token:token
         })

      }else {
         user = new userModel({
            avatar: ({url: "https://res.cloudinary.com/doquwihm4/image/upload/v1699196711/UserPetShop/user-removebg-preview_mq8msw.png"}),
            name,
            email,
            phone,
            password,
            isAdmin:false,
            valid
           
         })
                
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(user.password,salt)
         await user.save();
         const data = {
              _id:user._id,
              isAdmin:user.isAdmin
         }
         const token = createToken(data)
         const refreshToken =  createRefreshToken(data)
         const tokenData = new tokenModel({
            idUser:user._id,
            token:token,
            refreshToken:refreshToken
         })
         await tokenData.save()
         res.status(200).json({
            _id:user._id,
            avatar,
            name,
            email,
            isAdmin:false,
            token:token
         })


      }
   }catch(err){
      console.log(err)
      res.status(500).send(err)
   }
}
const loginUser = async(req,res) => {
      const {email,password} = req.body
      try {
       let user = await userModel.findOne({email})
       if(!user) return res.status(400).json("Invalid email or password")
       const isValidPassword = await bcrypt.compare(password,user.password)
       if(!isValidPassword) return res.status(400).json("Invalid email or password")
       const data = {
            _id:user._id,
            isAdmin:user.isAdmin
       }
       const token = createToken(data)
       const refreshToken = createRefreshToken(data)
       refreshTokens.push(refreshToken)
       const tokenUpdate = {
             token:token,
             refreshToken:refreshToken
       }
       await tokenModel.findOneAndUpdate({idUser:user._id},tokenUpdate)
       
       res.status(200).json({
         _id:user._id,
         avatar:user.avatar,
         name:user.name,
         email:user.email,
         isAdmin:false,
         token:token,
       })
      }catch(err){
         console.log(err)
         res.status(500).send(err)
      }
}
const requestRefreshToken = async(req,res) => {
   const {token} = req.body
   try {
      const dataToken = await tokenModel.findOne({token})
      const refreshToken = dataToken.refreshToken;
      if(!refreshToken) return res.status(401).json("You're not authenticated")
      const jwtKeyFresh = process.env.JWT_SECRET_REFRESH_KEY
      jwt.verify(refreshToken,jwtKeyFresh,(err,user)=> {
            if(err) res.status(403).json(err)
            refreshTokens = refreshTokens.filter((token)=> token !== refreshToken)
            const data = {
               _id:user._id,
               isAdmin:user.isAdmin
            }

            const token1 = createToken(data)
            const newRefreshToken = createRefreshToken(data)
            refreshTokens.push(newRefreshToken)
            res.status(200).json({
               token: token1
            })
            })
  
   }catch(err){
      console.log(err)
      res.status(500).send(err)
   }
}
const updateToken = async(req,res)=> {
     const {idUser,token} = req.body
     try {
          const tokenUpdate = {
              token:token,
              refreshToken:refreshTokens[1]
          }
         const response =  await tokenModel.findOneAndUpdate({idUser},tokenUpdate)
         res.status(200).json({
             token: response.token
         })
         
     }catch(err){
      console.log(err)
      res.status(500).send(err)
     }
}


const logOut = async(req,res) => {
     res.clearCookie("refreshToken")
     refreshTokens = refreshTokens.filter((token)=> token !== req.cookies.refreshToken)
     console.log(refreshTokens)
     res.status(200).json("Log out !")

}
const deleteUser = async(req,res) => {
       res.status(200).json("Delete Successfully")
}
const getAllTokens = async(req,res) => {
       try {
             const response = await tokenModel.find();
             res.status(200).json(response)
       }catch(err){
         console.log(err)
         res.status(500).send(err)
       }
}
const getAllUser = async(req,res)=> {
   try {
        const response = await userModel.find()
        res.status(200).json(response)
   }catch(err){
        console.log(err)
        res.status(500).send(err)
   }
}
const updateInfoUser = async(req,res) => {
          const {fullName,email,phone,valid,avatar,token} = req.body
          try {
                const data = {
                  name:fullName,
                  email,
                  phone,
                  valid,
                  avatar,
                  token
                }
                Object.keys(data).forEach((key)=> {
                      if(data[key] == "" || data[key] == " "){
                           delete data[key]
                      }
                })
                  let date = new Date()
                  const tokenDecode = jwt.decode(data.token)
                  if(tokenDecode?.exp < (date.getTime()/1000)){
                         res.status(400).json("Bạn cần đăng nhập lại")
                         console.log("hết hạn")
                  }else {      
                      const jwtKey = process.env.JWT_SECRET_KEY
                      jwt.verify(data.token,jwtKey,async(err,user)=> {
                          if(err) return res.status(400).json("Something went wrong")
                          const idFilter = {
                           _id:user?._id
                            }
                          if(data.avatar){
                                  const response = await  userModel.findOne(idFilter)
                                  if(!response) return res.status(400).json("You're not authenticated")
                                  const idPublicDelete = response.avatar.public_id
                                  await cloudinary.uploader.destroy(idPublicDelete)
                                  const responseImage = await cloudinary.uploader.upload(data.avatar,{
                                    upload_preset: "UserPetShop"
                                 })
                                 dataUpdate = {
                                    ...data,
                                    avatar:responseImage 
                                 }
                                
                                 await userModel.findOneAndUpdate(idFilter,dataUpdate)
                                 res.status(200).json(true)
                          }else {       
                                 await userModel.findOneAndUpdate(idFilter,data)
                                 res.status(200).json(true)
                          }
                          
                     })
                  }
          }catch(err){
            console.log(err)
            res.status(500).send(err)
          }
}
const handleOldPassword = async(req,res)=> {
    const {token,oldPassword} = req.body
    try {
         if(!token) return res.status(400).json("Bạn cần đăng nhập")
         if(!oldPassword) return res.status(400).json("Bạn cần điền mật khẩu cũ")
         let date = new Date()
         const tokenDecode = jwt.decode(token)
         if(tokenDecode?.exp < (date.getTime()/1000)){
            return res.status(400).json("Bạn cần đăng nhập lại")
         }else {
             
                  const jwtKey = process.env.JWT_SECRET_KEY
                   jwt.verify(token,jwtKey,async(err,userToken)=> {
                       if(err) return res.status(400).json("Bạn cần đăng nhập lại")
                       const user = await userModel.findOne({_id:userToken._id})
                       if(!user) return res.status(400).json("Account is not valid")
                       const isValidPassword = await bcrypt.compare(oldPassword,user.password)
                       if(!isValidPassword) return res.status(400).json("Bạn nhập sai mật khẩu cũ")
                       res.status(200).json(true)
                   })
         }

         
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
}
const handleNewPassword = async(req,res) => {
      const {token,newPassword} = req.body
      try {
         if(!token) return res.status(400).json("Bạn cần đăng nhập")
         if(!newPassword) return res.status(400).json("Bạn cần điền mật khẩu mới")
         let date = new Date()
         const tokenDecode = jwt.decode(token)
         if(tokenDecode?.exp < (date.getTime()/1000)){
            return res.status(400).json("Bạn cần đăng nhập lại")
         }else {
             
                   const jwtKey = process.env.JWT_SECRET_KEY
                   jwt.verify(token,jwtKey,async(err,userToken)=> {
                       if(err) return res.status(400).json("Bạn cần đăng nhập lại")
                       const dataFilter = {
                           _id:userToken._id,

                       }
                       const salt = await bcrypt.genSalt(10)
                       password = await bcrypt.hash(newPassword,salt)
                       const dataUpdate = {
                            password:password
                       }
                       const response = await userModel.findOneAndUpdate(dataFilter,dataUpdate)
                       res.status(200).json(true)
                   })
         }
      }catch(err){
         console.log(err)
         res.status(500).send(err)
      }
}
const  forgotPassword = async(req,res) => {
     const {email,phone,valid} = req.body
     try {
             if(!email || !phone || !valid)  return res.status(400).json("All field are required")
             const filter = {
                 email,
                 phone,
                 valid
             }
             const response = await userModel.findOne(filter)
             if(response){
               let config = {
                  service: "gmail",
                  auth: {
                       user:process.env.EMAIL,
                       pass:process.env.PASSWORD
                  }
                }
              const data = `<h1  style="color:red">Bạn đang thực hiện tác vụ quên mật khẩu. Phải bạn không?</h1>`
              let transporter = nodemailer.createTransport(config) 
              let message = {
               from: process.env.EMAIL,
               to: response.email,
               subject:"Xác nhận mật khẩu",
               html:data
              }
                const token = createToken({
                  _id:response._id
               })
                transporter.sendMail(message).then(()=> {
                  res.status(200).json({
                     isValid:true,
                     token
                 })
                })
             
             }else {
                   return res.status(400).json("Something went wrong")
             }
             
     }catch(err){
          console.log(err)
          res.status(500).send(err)
     }
}
const newPassword = async(req,res)=> {
   const {token,newPassword, newPasswordVer} = req.body 
   try {
          if(!token) return res.status(400).json("You're not authenticated")
          if(!newPassword || !newPasswordVer) return res.status("Bạn chưa điền đây đủ thông tin")
          if(newPassword  ===  newPasswordVer){
            if(!validator.isStrongPassword(newPasswordVer)) return res.status(400).json("Password must be strong password")
            const jwtKey = process.env.JWT_SECRET_KEY
            jwt.verify(token,jwtKey,async(err,userToken)=> {
                 if(err) return res.status(400).json("Bạn đã quá hạn để lấy lại mật khẩu")
                 const salt = await bcrypt.genSalt(10)
                 const password = await bcrypt.hash(newPasswordVer,salt)
                 const dataFilter = {_id:userToken._id}
                 const dataUpdate = {password:password}
                 await userModel.findOneAndUpdate(dataFilter,dataUpdate)
                 res.status(200).json(true)
            })
          }else {
            console.log("Bạn cần nhập chính xác mật khẩu mới")
            res.status(400).json("Bạn cần nhập chính xác mật khẩu mới")
          }
          
   }catch(err){
      console.log(err)
      res.status(500).send(err)
   }
}
const checkAdmin = async(req,res)=> {
    const {token} = req.body 
    try {
      if(!token) return res.status(400).json("Bạn cần đăng nhập")
      let date = new Date()
      const tokenDecode = jwt.decode(token)
      if(tokenDecode?.exp < (date.getTime()/1000)){
         return res.status(400).json("Bạn cần đăng nhập lại")
      }else {
          
                const jwtKey = process.env.JWT_SECRET_KEY
                jwt.verify(token,jwtKey,async(err,userToken)=> {
                    if(err) return res.status(400).json("Bạn cần đăng nhập lại")
                    if(userToken.isAdmin === "true"){
                        return  res.status(200).json(true)
                    }else {
                         return  res.status(200).json(false)
                    }
                })
      }
    }catch(err){
      console.log(err)
      res.status(500).send(err)
    }
   }
module.exports = {registerUser,loginUser,deleteUser,requestRefreshToken,logOut, updateToken,getAllTokens,getAllUser,updateInfoUser ,handleOldPassword,handleNewPassword,forgotPassword,newPassword,checkAdmin  }