const express = require('express')
const router =  express.Router()

const auth = require('../MiddleWare/authentication')
const { getAllInfo,createInfo ,getInfo, updateInfo,deleteInfo, getCreated, deleteAllInfo} = require('../controller/info')



router.route('/').get(getAllInfo)
router.route('/created').get(auth, getCreated)
router.route('/').post(auth, createInfo)
router.route('/:id').get(  getInfo).patch(auth ,updateInfo).delete(auth,deleteInfo)
router.route('/deleteall').delete(auth, deleteAllInfo)

module.exports = router