const sendToken = (user,statuCode,res)=>{
    // Creating JWT Token
    const token = user.getJwtToken();

    // setting Cookies
    const options ={
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly :true,
    }
    // res.setHeader('Authorization', 'token '+ token); 
    // res.header('Authorization', 'token '+ token);
    res.status(statuCode).setHeader('token',token,options).json({
        success:true,
        token,
        user
    })
}

module.exports = sendToken;