const incomeModel = require("../models/income")
const uploadIncome = async(req,res)=> {
     const {everyDay} = req.body
     try {
         if(!everyDay) return res.status(400).json("Something went wrong")
         data = new incomeModel({
            everyDay
         })
         await data.save()
         res.status(200).json(data)
     }catch(err){
        console.log(err)
        res.status(500).send(err)
     }
}
const getAllIncome = async(req,res)=> {
    try {
          const response = await incomeModel.find()
          res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const updateDetail = async(req,res)=> {
    const {_id,everyDay} = req.body
    try {
       const filter = {
           _id:_id
       }
       const update = {
           everyDay:everyDay
       }
       await incomeModel.findOneAndUpdate(filter,update)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
const updateDetailAfter = async(req,res) => {
      const {_id,dataUpdate} = req.body
      try {
          if(!_id || !dataUpdate) return res.status(400).json("Something went wrong")
          const index  = dataUpdate.findIndex((item)=>  item._id === _id)
          const data = dataUpdate[index].everyDay
          const dataFilter = {_id}
          const dataEveryDay = {
               everyDay: data
          }
          await incomeModel.findOneAndUpdate(dataFilter,dataEveryDay)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
     }
}

module.exports = {uploadIncome,getAllIncome,updateDetail,updateDetailAfter}