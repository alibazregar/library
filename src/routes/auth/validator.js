const {check} = require('express-validator')
module.exports = new class {
    register(){
        return[
            check('firstName')
            .not()
            .isEmpty()
            .withMessage('first name  is empty'),

            check('lastName')
            .not()
            .isEmpty()
            .withMessage('last name is empty'),

            check('email')
            .isEmail()
            .withMessage('invalid email'),
            
            check('password')
            .not()
            .isEmpty()
            .isLength({ min: 5 })
            .withMessage('password is too short')
            
        ]
    }
    login(){
        return[
            check('email')
            .isEmail()
            .withMessage('invalid email'),
            
            check('password')
            .isLength({ min: 5 })
            .withMessage('invalid password'),

        ]
    }
}