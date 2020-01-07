const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter valid email')
            .custom((value, { req }) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists');
                    }
                })
            })
            .normalizeEmail(),
        body('password', 'Please enter a password with only numbers and text at least 5 characters')
            .trim()
            .isLength({min: 5})
            .isAlphanumeric(),
        body('confirmPassword')
            .trim()
            .isLength({min: 5})
            .custom((value, {req}) => {
                if (value !== req.body.password)  {
                    return Promise.reject('Passwords don`t equal');
                }

                return true
        })
    ],
    authController.signup
);


router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter valid email'),
        body('password')
            .trim()
            .isLength({min: 5})
    ],
    authController.login
);

module.exports = router;
