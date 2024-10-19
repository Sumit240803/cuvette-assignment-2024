const nodemailer =require("nodemailer");
const path = require("path");
const fs = require("fs");
const sendEmail = async(email,subject,templateName,replacements)=>{
    try{
        const transporter =nodemailer.createTransport({
            service : "Gmail",
            auth :{
                user : process.env.USER_MAIL,
                pass : process.env.USER_PASS
            },

        });
        const templatePath = path.join(__dirname , 'templates' , `${templateName}.html`);
        let htmlContent = fs.readFileSync(templatePath,'utf-8');
        for(const key in replacements){
            htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`,'g'),replacements[key])
        }   

        const mailOptions = {
            from : process.env.USER_MAIL,
            to : email,
            subject,
            html : htmlContent
        }
        await transporter.sendMail(mailOptions);
        console.log("Email submitted");
    }catch(error){
        console.log("Error sending email" , error);
    }
}

module.exports = sendEmail;