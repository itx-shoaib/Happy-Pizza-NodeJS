const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

const app = express();



app.use(express.json())
app.use(cors());
app.use(bodyparser.json());

const menuRoute = require('./router/menuRouter')
const orderRoute = require('./router/orderRouter')
const orderitemRoute = require('./router/orderitemRouter')
app.use('/api/admin', menuRoute)
app.use('/api/admin',orderRoute)
app.use('/api/admin',orderitemRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))