const jwt = require('jsonwebtoken');

const verifyToken =  (req, res, next) => {

    //get token from request
    const token = req.get('token');
    //Decoded contains info from token, info of the user
    jwt.verify(token, process.env.AUTH_SEED, (err, decoded) => {
        if(err){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Invalid token',
                    status: false
                });
        }
        //decoded may contain info due payload
        req.user = decoded.user;
        next();
    });



}

module.exports = {
    verifyToken
}