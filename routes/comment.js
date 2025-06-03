const express = require('express')
const router =  express.Router()

const auth = require('../MiddleWare/authentication')
const { getAllComment,createComment ,getComment, updateComment,deleteComment} = require('../controller/comment')



router.route('/').get(getAllComment)
router.route('/').post( createComment)
router.route('/:id').get(auth,  getComment).patch(auth ,updateComment).delete(auth,deleteComment)

module.exports = router