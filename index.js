const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const schema = require('./schema')
// to connect mongoDB with nodemon.js 
mongoose.connect("mongodb+srv://mobashir:mobashir123@cluster0.sv5dvda.mongodb.net/Grocery?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected with mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

// creaded model to define collection in side the mongoDb 
const model = new mongoose.model("myzer", schema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// home route 
app.get('/', (req, res) => {
    console.log("Hello World");
    res.send({ "status": 200, "messge": "success" })
})

// data route where we can pass data through postman using http://localhost:4000/data 
app.post("/data", async (req, res) => {
    const bodyData = req.body;
    const welcome_txt = bodyData.welcome_txt;
    const paragraph = bodyData.paragraph;
    console.log(welcome_txt, paragraph);

    const output = await model.create({
        welcome_txt, paragraph
    });
    res.status(200).json({
        success: true,
        output
    });
})

app.get('/view', async (req, res) => {
    const output = await model.find();
    // res.status(200).json({
    //     success: true,
    //     output
    // });
    res.send(`<div><h1>${output[0].welcome_txt}</h1><p>${output[0].paragraph}</p></div> ${output}`)
    // res.send(output)
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server is running: http://localhost:4000");
})