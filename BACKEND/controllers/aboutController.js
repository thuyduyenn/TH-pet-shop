const aboutCommentModel = require("../models/aboutComment")
const userModel = require("../models/user")
const putDataAbout = async(req,res) => {
    const {idUser,text,rating} = req.body
    try {
        if(!idUser) return res.status(400).json("Bạn cần đăng nhập")
        if(!text || !rating) return res.status(400).json("All field are required")
        aboutData = new aboutCommentModel ({
              idUser,
              text,
              rating,
        })

        await aboutData.save()
        const users = await userModel.find()
        const avatarComment  = []
        for(let i = 0 ; i < users?.length ; i++){
               if((users[i]._id).toString() === idUser){
                 avatarComment.push(users[i].avatar?.url)
               }
        }
        res.status(200).json({
            idUser,
            text,
            rating,
            avatarComment:avatarComment[0],
            _id:aboutData._id
        })
    }catch(err){
        console.log(err)
        res.status(200).send(err)
    }

}
const getDataAbout = async(req,res)=> {
     try {
             const response = await aboutCommentModel.find()
             const users = await userModel.find()
             const data = []
             for(let i = 0; i < response.length; i++){
                  for(let j = 0; j < users.length; j++){
                       if(response[i].idUser === (users[j]._id).toString()){
                              const item = {
                                    idUser:response[i].idUser,
                                    text:response[i].text,
                                    rating:response[i].rating,
                                    createdAt:response[i].createdAt,
                                    avatarComment: users[j].avatar.url,
                                    nameComment:users[j].name,
                                    _id:response[i]._id
                              }
                              data.push(item)
                       }
                    
                  }
             }
           
             res.status(200).json(data)
     }catch(err){
        console.log(err)
        res.status(200).send(err)
     }
}
module.exports = {putDataAbout,getDataAbout}