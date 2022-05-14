const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
//const mysql = require('mysql')
const app = express()

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://admin:Kitchener121!@cluster0.y7mlk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=> console.log("DB connection successfull"))
.catch((err) => console.log(err))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen('5000', () => {
    console.log('Server started at Port 5000')
})

