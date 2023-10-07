const express= require('express')
const { createUser, loginUser, fetchUserById } = require('../controllers/UserController')


const router= express.Router()

router.get('/:id', fetchUserById)
router.post('/signup',createUser).post('/login',loginUser)

exports.router= router