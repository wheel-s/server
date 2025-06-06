const express = require('express')
const router =  express.Router()

const auth = require('../MiddleWare/authentication')
const { getAllInfo,createInfo ,getInfo, updateInfo,deleteInfo, getCreated} = require('../controller/info')



router.route('/').get(getAllInfo)
router.route('/created/:id').get(getCreated)
router.route('/').post(auth, createInfo)
router.route('/:id').get(  getInfo).patch(auth ,updateInfo).delete(auth,deleteInfo)

module.exports = router