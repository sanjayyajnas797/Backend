const express=require('express')

const router=express.Router()

const {Createrole,Getrole,Getbyid,UpdateRole,Delete}=require('./Role')

router.post('/roles',Createrole)
router.get('/roles',Getrole)
router.get('/roles/:id',Getbyid)
router.put('/roles/:id',UpdateRole)
router.delete('/roles/:id',Delete)

module.exports=router