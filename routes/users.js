const express = require('express')
const router =  express.Router()
const { register,login ,getUser, updateUser,deleteUser} = require('../controller/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router