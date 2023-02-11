const nodemailer = require('nodemailer')

const sendEmail = async options =>{
    const transport ={
        host:process.env.SMPTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    };

    const transporter = nodemailer.createTransport(transport);

    const message ={
        from :`${process.env.SMPTP_FROM_NAME} <${process.env.SMPT_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        test:options.message
    }
   await transporter.sendMail(message)
}


module.exports = sendEmail;