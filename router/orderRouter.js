const express = require("express");
const router = express.Router();
// const bcrypt = require('bcryptjs')
const dbconfig = require('../db');

// ROUTER 1: Register a customer by POST method PATH: http://localhost:5000/api/admin/register
// STATUS: WORKING BUT HAVE AN ERROR
router.post('/register',async(req,res)=>{
    // const salt = bcrypt.genSalt(10);
    // const secPass = bcrypt.hash(req.body.password,salt);
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let password = req.body.password;


    let qr = await `insert into customer(name,email,number,password)
    values('${name}','${email}','${number}','${password}')`
     dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        if (result.length>0) {
            res.send({
                message : 'Customer is registered',
                data:result
            });
        }
    })
});


// ROUTER 1: Getting orders by cart by POST method PATH: http://localhost:5000/api/admin/cart/:cid/:id
// STATUS: 
router.post('/cart/:cid/:id',(req,res)=>{
    let customer_id = req.params.cid;
    let item_id = req.params.id;
    let item_quantity = req.body.item_quantity;


    let qr = `SELECT * FROM item
            where item_id = '${item_id}'
    insert into cart(customer_Id,item_Id,item_name,item_price,item_quantity)
    values('${customer_id}','${item_id}','${item_name}','${item_price}','${item_quantity}')`
     dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        if (result.length>0) {
            res.send({
                message : 'Customer is registered',
                data:result
            });
        }
    })
});


module.exports = router