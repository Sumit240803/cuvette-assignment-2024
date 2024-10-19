const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes")
const session = require("express-session");
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET_COOKIE, resave: false, saveUninitialized: true,cookie : {secure : false} }));
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Database connected")).catch((error)=>console.log("Error connecting database",error));
app.use('/auth', authRoutes);
app.listen(5000, () => console.log(`Server running on port ${process.env.PORT}`));