const express = require('express')
const app = express()
const dotenv =require('dotenv')
dotenv.config();
require("./db/dbconnection");
const cors = require("cors");
const userRoutes = require("./route/users");
const authRoutes = require("./route/auth");
const passwordResetRoutes = require("./route/PasswordReset");
const patientRoutes=require("./route/route")

//middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/registered",patientRoutes);




app.listen(4000,()=>{
    console.log('port connected');
})