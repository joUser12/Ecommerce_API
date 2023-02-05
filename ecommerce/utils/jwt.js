const sendToken = (user,statuCode,res)=>{
    // Creating JWT Token
    const token = user.getJwtToken();

    // setting Cookies
    const options ={
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly :true,
    }

    res.status(statuCode).cookie('token',token,options).json({
        succes:true,
        token,
        user
    })
}

module.exports = sendToken;