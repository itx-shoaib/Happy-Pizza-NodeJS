const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

const app = express();



app.use(express.json())
app.use(cors());
app.use(bodyparser.json());

const menuRoute = require('./router/menuRouter')
app.use('/api/admin', menuRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started by using nodemon"))