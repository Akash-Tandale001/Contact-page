const express = require('express');
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json())

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/',(req,res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MYEMAIL,
            pass:process.env.MYPASSWORD
        }
    }) 

    const mailOption ={
        from:req.body.email,
        to:process.env.MYEMAIL,
        subject:`Message from ${req.body.email}: ${req.body.subject} `,
        text:req.body.message
    }
    transporter.sendMail(mailOption , (error , info)=>{
        if(error){
            console.log(error);
            res.send('error');

        }
        else{
            console.log("Email sent : " +info.response)
            res.send('success')
        }
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})