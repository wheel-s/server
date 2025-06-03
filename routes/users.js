const express = require('express')
const router =  express.Router()
const { register,login ,getUser, updateUser,deleteUser, logOut} = require('../controller/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logOut)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router