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


// ROUTER 2: Creating orders by cart by POST method PATH: http://localhost:5000/api/admin/cart/:id
// STATUS: WORKING
router.post('/cart/:id',(req,res)=>{
    let customer_id = req.params.id;
    let status = req.body.status;

    let qr = `
    insert into cart(customer_Id,Status)
    values('${customer_id}',${status})`
     dbconfig.query(qr,(err,result)=>{
        
        if (err) {
            console.log(err,'errs');
        }
        if (result.affectedRows>0) {
            res.send({
                message : 'Order is activated',
               
            });
        }
    })
});

// ROUTER 3: Updating the orders status by PUT method PATH: http://localhost:5000/api/admin/updatestatus/:id
// STATUS: WORKING
router.put('/updatestatus/:id',(req,res)=>{
    let id = req.params.id;
    let status = req.body.status;

    let qr = `
            update cart 
                    set Status = ${status}
                    where cart_Id = ${id}`
     dbconfig.query(qr,(err,result)=>{
        
        if (err) {
            console.log(err,'errs');
        }
        else {
            res.send({
                message : 'Order is Updated',
               
            });
        }
    })
});

// ROUTER 4: Getting the orders  by GET method PATH: http://localhost:5000/api/admin/getorders
// STATUS: WORKING
router.get('/getorders',(req,res)=>{
    let qr = `
    SELECT * FROM cart
            `
     dbconfig.query(qr,(err,result)=>{
        
        if (err) {
            console.log(err,'errs');
        }
        else {
            res.send({
                data : result
               
            });
        }
    })
});

// ROUTER 5: Deleting the order  by DELETE method PATH: http://localhost:5000/api/admin/deleteorder/:id
// STATUS: WORKING
router.get('/deleteorder/:id',(req,res)=>{
    let id = req.params.id
    let qr = `delete from cart 
    where cart_Id = ${id}`
     dbconfig.query(qr,(err,result)=>{
        
        if (err) {
            console.log(err,'errs');
        }
        else {
            res.send({
                message:"Orders has been deleted"
               
            });
        }
    })
});

module.exports = router