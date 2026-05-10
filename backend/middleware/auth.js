const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    try {

        // get token from frontend
        const header = req.headers.authorization;

        if(!header){

            return res.status(401).json({
                message: "No token"
            });

        }

        // remove "Bearer "
        const token = header.split(" ")[1];

        // verify token
        const decoded = jwt.verify(

            token,
            process.env.JWT_SECRET

        );

        // save user info
        req.user = decoded;

        next();

    } catch(err){

        res.status(401).json({
            message: "Invalid token"
        });

    }

}

module.exports = auth;