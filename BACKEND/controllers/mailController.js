const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")
const sendMail = async(req,res)=> {
    const {userEmail,orders, nameCustomer,phoneCustomer,addressCustomer,commend} = req.body
    let config = {
         service: "gmail",
         auth: {
              user:process.env.EMAIL,
              pass:process.env.PASSWORD
         }
    }

    let transporter = nodemailer.createTransport(config)
    let MailGenerator = new Mailgen({
          theme: "default",
          product:{
              name:"Mailgen",
              link:"https://mailgen.js/"
          }
    })
    let response = {
          body: {
            name:"Hi",
            intro: "Các đơn hàng bạn đã đặt",
            table: {
                data: [
                    ...orders
                ]
            },
            outro: "Hãy chờ đợi nhé chúng tôi đang xử lí sẽ  sớm thôi!!!"
          }
    }
   
    let mail = MailGenerator.generate(response)
    let items = []
    let total = 0;
     for(let i = 0; i < orders.length;  i++){
            total += orders[i].SL * orders[i].price;
            const item = `<tr style="font-size:20px;color:#001830;font-weight:600">
                           <td>${i+1}</td>
                           <td>${orders[i].nameProduct}</td>
                           <td>${orders[i].price}</td>
                           <td>${orders[i].SL}</td>
                           <td ><img style="width:100px;height:150px" src="${orders[i].imageProduct.url}"/></td>
                           <td>${orders[i].SL * orders[i].price}</td>
                   </tr>`
            items.push(item)    
     }
   let data = `<div className="mail">
                     <h1 style="color:#00A67E;font-size:40px;font-weight:600">Hi <span>${nameCustomer}</span></h1>
                     <table style="width:100%;height:auto;text-align:center"> 
                         <thead>
                              <tr style="font-size:20px;color:#EF4B4B; font-weight:600">
                              <th>STT</th>
                              <th>Name</th>
                              <th>Giá/sp</th>
                              <th>SL</th>
                              <th>Hình ảnh</th>
                              <th>Tổng tiền</th>
                              </tr>
                         </thead>
                         <tbody>`
                               +       
                                     items.join("")
                               +
                                       `</tbody>
                                        </table>
                       <h4 style="width:100%;height:40px;background:#00A67E;color:#001830;font-size:30px;font-weight:600;text-align:center">Tổng tiền phải trả là : <span style="color:#EF4B4B">${total}k</span></h4>
                       <ul className="mail-address" style="font-size:30px;font-weight:600;color:#001830;">
                             <li>Tên người nhận: ${nameCustomer}</li>
                             <li>SDT: ${phoneCustomer}</li>
                             <li>Địa chỉ: ${addressCustomer}</li>
                             <li>Địa chỉ: ${commend}</li>
                       </ul>
                </div>`;  
    let message = {
          from: process.env.EMAIL,
          to: userEmail,
          subject:"Xác nhận đặt hàng",
          html:data
    }
    transporter.sendMail(message).then(()=> {
           return res.status(201).json({
            msg: "you should receive an email"
           })
    })
    .catch(err => {
           return res.status(500).json({err})
    })
}
module.exports = {sendMail}