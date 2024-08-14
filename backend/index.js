// backend/index.js
const express = require('express');
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
const rootRouter = require("./ROUTES/index");
app.use("/api/v1", rootRouter);

app.listen(3000 ,()=>{
    console.log("APP IS LISTENING ON PORT 3000")
});