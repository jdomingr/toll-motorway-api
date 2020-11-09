//middleware that perform the validation of ADMIN_ROLE to do some actions

const isAdmin = (req, res, next) => {

    const user = req.user;

    if(user.role === 'USER_ROLE'){
        return res.status(401)
            .json({
                data: null, 
                error: 'Unauthorized, you cant access to this resource'
            });
    }


    next();

}

module.exports = {
    isAdmin
}