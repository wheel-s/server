const express = require('express')
const router =  express.Router()

const auth = require('../MiddleWare/authentication')
const { getAllInfo,createInfo ,getInfo, updateInfo,deleteInfo} = require('../controller/Favoutite')



router.route('/').get(getAllInfo)
router.route('/').post(auth, createInfo)
router.route('/:id').get(  getInfo).patch(auth ,updateInfo).delete(auth,deleteInfo)

module.exports = router