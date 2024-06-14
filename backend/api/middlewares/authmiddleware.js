const jwt = require("jsonwebtoken")

function authmiddleware(req,res,next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
    {
        res.status(401).json({msg:"Unauthorized."})
    }
    else 
    {
        const decode = jwt.verify(token,"bookApp")
        if(decode)
            {
                // console.log("Auth check Done!")
                next()
            }
        else 
        {
            res.status(401).json({msg:"Invalid access token."})
        }
    }
}

module.exports = authmiddleware;
