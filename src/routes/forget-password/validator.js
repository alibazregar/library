const {check} = require('express-validator')
module.exports = new class{
    email(){
        return[
            check('email')
            .isEmail()
            .withMessage('invalid email')
        ]
    }
    receiveCode(){
        return[
            check('code')
            .isLength({ min: 6 })
            .withMessage('code is too short'),
        ]
    }
    changePassword(){
        return[
            check('password')
            .isLength({ min: 5 })
            .withMessage('invalid password'),
        ]
    }


}
    