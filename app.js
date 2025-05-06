const express = require("express");
require('dotenv').config();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3030;

const ENDPOINT = "https://script.google.com/macros/s/AKfycbxIh3jaUpbVKkuwejHPIYcmVWVEllz70_WMwZgzPZ75afjrZwTfAV7kI389RAukPso/exec";

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.post("/", (req, res) => {
    let request = req.body;
    axios
    .post(`${ENDPOINT}?role=${request.role === "other" ? request["role-Comment"] : request.role}`, request)
    .then(async resp => {
        if(resp.status === 200){
            let data = resp.data;
            res.status(200).send("Data captured");
        }
    }).catch(e => {
        console.log("Error", e)
    });
});

app.listen(PORT, () => console.log(`Wisdom Labs listening on port ${PORT}!`));