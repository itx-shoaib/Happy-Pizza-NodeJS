const express = require("express");
const router = express.Router();
const dbconfig = require('../db')

// ROUTER 1: Getting all the menu by GET method PATH: http://localhost:5000/api/admin/getallmenu
// STATUS: WORKING
router.get('/getallmenu',(req,res)=>{
    let qr = 'SELECT * FROM category'
    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err,'errs');
        }
        if (result.length>0) {
            res.send({
                message : 'all customer data',
                data:result
            });
        }
    })
})

// ROUTER 2: Creating the menu by POST method PATH: http://localhost:5000/api/admin/createmenu
// STATUS: WORKING
router.post('/createmenu',(req,res)=>{
    let name = req.body.name;
    let image = req.body.image;

    let qr = `insert into category(Name,Image)
                    values('${name}','${image}')`

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            message:'data inserted'
        })
})
});


// ROUTER 3: Updating the menu by PUT method PATH: http://localhost:5000/api/admin/updatemenu/:id
// STATUS: WORKING
router.put('/updatemenu/:id',(req,res)=>{
    let id = req.params.id;
    let name = req.body.name;
    let image = req.body.image;
    

    let qr = `update category 
                    set Name = '${name}',Image = '${image}'
                    where id = ${id}`;

    dbconfig.query(qr,(err,result)=>{
        if (err) {
            console.log(err)
        }
        res.send({
            data:result
        });

    });
})


// ROUTER 4: Deleting the menu by DELETE method PATH: http://localhost:5000/api/admin/deletemenu/:id
// STATUS: WORKING
router.delete('/deletemenu/:id',(req,res)=>{
    let id = req.params.id
    let qr = `delete from category 
                where id = '${id}'`;

        dbconfig.query(qr,(err,result)=>{
        if (err) {
        console.log(err)
        }
        res.send({
        message:'data deleted'
        });

});

})

// ALTER TABLE `item` ADD  CONSTRAINT `FK_category` FOREIGN KEY (`item_id`) REFERENCES `category`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
// ALTER TABLE item
//                 ADD FOREIGN KEY (ID) REFERENCES category(ID)
//                 where id = '${category_id}'
//                 insert into item(Name,Description,Price,Image)
//                 values('${name}','${image}','${description}''${price}')
// ROUTER 4: Deleting the menu by DELETE method PATH: http://localhost:5000/api/admin/createitem/:id
// STATUS: 
router.post('/createitem/:id',(req,res)=>{
    let category_id = req.params.id
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let price = req.body.price;
    let qr = `SELECT category.ID, Customers.CustomerName, Orders.OrderDate
    FROM Orders
    INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;`
;

        dbconfig.query(qr,(err,result)=>{
        if (err) {
        console.log(err)
        }
        res.send({
        message:'data inserted'
        });

});

})

module.exports = router