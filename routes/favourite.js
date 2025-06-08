const express = require('express')
const router =  express.Router()

const auth = require('../MiddleWare/authentication')
const { getAllFav,createFav ,getFav, updateFav,deleteFav} = require('../controller/favourite')



router.route('/').get(auth,getAllFav)
router.route('/').post(auth, createFav)
router.route('/:id').get( getFav).patch(auth ,updateFav).delete(auth,deleteFav)

module.exports = router