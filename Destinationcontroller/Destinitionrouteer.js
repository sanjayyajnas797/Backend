const express=require('express')
const router=express.Router()
const {check}=require('../controllers/verifytoken')
const{Add,Get,DestinationId,Update,Delete}=require('./Destination')

router.post('/destination',check('admin'),Add)
router.get('/destination',check('admin'),Get)
router.get('/destination/:id',check('admin'),DestinationId)
router.put('/destination/:id',check("admin"),Update)
router.delete('/destination/:id',check('admin'),Delete)

module.exports=router