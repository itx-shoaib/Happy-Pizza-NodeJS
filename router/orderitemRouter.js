const express = require("express");
const router = express.Router();
// const bcrypt = require('bcryptjs')
const dbconfig = require('../db');

// ROUTER 1: Creating the orderitem by POST method PATH: http://localhost:5000/api/admin/createorderitem/:pid/:bid
// STATUS: WORKING
router.post('/createorderitem/:pid/:bid',(req,res)=>{
    let Product_id = req.params.pid;
    let quantity = req.body.quantity
    let price = req.body.price;
    let order_id = req.params.bid

    let qr = `insert into orderitem(ProductID,Quantity,Price,Order_ID)
                    values(${Product_id},${quantity},${price},${order_id})`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            data:result
        })
})
});

// ROUTER 1: Creating the orderitem by POST method PATH: http://localhost:5000/api/admin/createorderitem/:pid/:bid
// STATUS: WORKING
router.post('/createorderitem/:pid/:bid',(req,res)=>{
    let Product_id = req.params.pid;
    let quantity = req.body.quantity
    let price = req.body.price;
    let order_id = req.params.bid

    let qr = `insert into orderitem(ProductID,Quantity,Price,Order_ID)
                    values(${Product_id},${quantity},${price},${order_id})`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            data:result
        })
})
});

// ROUTER 2: Getting all orderitem by GET method PATH: http://localhost:5000/api/admin/getallorderitem
// STATUS: WORKING
router.get('/getallorderitem',(req,res)=>{

    let qr = `SELECT * FROM orderitem`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            data:result
        })
})
});

// ROUTER 3: Updating the orderitem by PUT method PATH: http://localhost:5000/api/admin/updateorderitem/:id
// STATUS: WORKING
router.put('/updateorderitem/:id',(req,res)=>{

    let id = req.params.id;
    let quantity = req.body.quantity

    let qr = `update orderitem 
    set Quantity = ${quantity}
    where ID = ${id}`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            message:"Data has beeen updated"
        })
})
});

// ROUTER 4: Deleting the orderitem by DELETE method PATH: http://localhost:5000/api/admin/deleteorderitem/:id
// STATUS: WORKING
router.delete('/deleteorderitem/:id',(req,res)=>{

    let id = req.params.id;

    let qr = `delete from orderitem 
    where ID = ${id}`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            message:"Data has beeen Deleted"
        })
})
});

module.exports = router