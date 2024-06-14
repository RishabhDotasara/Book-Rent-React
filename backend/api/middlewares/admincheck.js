const User = require("../modals/User")
const jwt =require("jsonwebtoken")


function adminCheck(req, res, next) {

    //it is important to check with the db if the user is actually a admin or not as requests can be hindered.
    //we will get the token from the auhorization header, which will be used to retrieve the user info
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
        {
            res.status(403).json({msg:"No access token."})
        }
    else 
    {

        const username = jwt.verify(token,"bookApp").username;
        console.log(username)
        User.findOne({username:username})
        .then(user=>{
            if (user.isAdmin)
                {
                    // console.log("Is Admin!")
                    next()
                }
            else 
            {
                res.status(403).json({msg:"Access not allowed!"})
            }
        })
    }
}

module.exports = adminCheck;