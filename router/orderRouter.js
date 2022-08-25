const express = require("express");
const router = express.Router();
const { check, validationResult  } = require('express-validator');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const dbconfig = require('../db');

// ROUTER 1: Register a customer by POST method PATH: http://localhost:5000/api/admin/register
// STATUS: WORKING
router.post('/register',[
    check("email","Enter the valid email").isEmail(),
    check("password","Your password is less then 6 digits").isLength({
        min:6
    })
],async(req,res)=>{

    const secPass = await bcrypt.hash(req.body.password,10);
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    let password =secPass;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }


    // let user = await `SELECT * FROM customer
    // WHERE email = '${email}'`

    // if (!user) {
    //     return res.status(400).json({error:"Sorry a user with this email already exist"})
    // }
    const token = await JWT.sign({
        email
    },"fn789disdhcsc87scsdcsdb4",{
        expiresIn:3600000
    })

    let qr = await `insert into customer(name,email,number,password)
    values('${name}','${email}',${number},'${password}')`
        dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        else {  
            
            res.json({
                token
            });
        }
    })
   
});


// ROUTER 1.1: Register a customer by GET method PATH: http://localhost:5000/api/admin/login
// STATUS: WORKING BUT HAVE AN ERROR
router.get('/login',(req,res)=>{
    // const salt = bcrypt.genSalt(10);
    // const secPass = bcrypt.hash(req.body.password,salt);

    let email = req.body.email;
    let password = req.body.password;

    // let user = await `SELECT * FROM customer 
    // where email = '${email}'`
    // // let qr = `SELECT * FROM customer where email = '${email}' AND password= '${password}'`
    //  var users = dbconfig.query(user,(err,result)=>{
    //     if (err) {
    //         console.log(err,'errs');
    //     }
    //     else {
    //       test(`${email}`)
    //     }
    // })

   var name = test(`${email}`)
   res.send(name)

   
});

 function test(email){
    console.log(email)
    let user = `SELECT * FROM customer 
    where email = '${email}'`
    // let qr = `SELECT * FROM customer where email = '${email}' AND password= '${password}'`
    dbconfig.query(user,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        else {
           var name = "Shoaib"
           return email
        }
    })
   
}

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