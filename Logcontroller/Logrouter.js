const express=require('express')

const router=express.Router()

const {Incoming}=require('./Log')

router.post('/log',Incoming)

module.exports=router