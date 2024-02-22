const jwt = require("jsonwebtoken");

const verifyJwt = (req,res,next) => {
    try {
        const token = req.header('authorization');
        const decode = jwt.verify(token, process.env.TOKEN_SECRET )
        if(!token ) {
            return res.status(400).json({message: "Invalid Token"})
        }
        if(!decode) {
            return res.status(400).json({message: "Invalid Token"})
        }

        req.body.userID = decode.userID;
        next();

    } catch (error) {
        return res.status(409).json({message: "Authentication failed"})
    }

}

module.exports = verifyJwt