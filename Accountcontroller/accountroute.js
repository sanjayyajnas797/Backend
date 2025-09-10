const express=require('express')

const router=express.Router()
const {check}=require('../controllers/verifytoken')
const {Createaccount,Getdata,GetdataId,Update,Delete}=require('../Accountcontroller/Accountcontroller')

router.post('/createaccount',check('admin'),Createaccount)
router.get('/accountget',check(["admin",'user']),Getdata)
router.get('/accountid/:id',check('admin'),GetdataId)
router.put('/accountupdate/:id',check('admin'),Update)
router.delete('/accountdelete/:id',check('admin'),Delete)
module.exports=router