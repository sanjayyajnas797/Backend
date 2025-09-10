const express=require('express')
const router=express.Router()

const {Addmember,Get,Update,Delete}=require('./Accountmember')
const {check}=require('../controllers/verifytoken')

router.post('/member',check('admin'),Addmember)
router.get('/member',check('admin'),Get)
router.put('/member/:id',check('admin'),Update)
router.delete('/member/:id',check('admin'),Delete)

module.exports=router