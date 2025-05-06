const express = require("express");
require('dotenv').config();
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3030;

const ENDPOINT = "https://script.google.com/macros/s/AKfycbxIh3jaUpbVKkuwejHPIYcmVWVEllz70_WMwZgzPZ75afjrZwTfAV7kI389RAukPso/exec";

app.use(cors());
app.use(helmet());

// Parse application/json
app.use(express.json());


app.post("/", (req, res) => {
    let request = req;
    console.log("Req body", request.body);
    const params = new URLSearchParams();
    for (const key in request.body) {
      params.append(key, request.body[key]);
    }
    axios
    .post(`${ENDPOINT}`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(async resp => {
        if(resp.status === 200){
            let data = resp.data;
            console.log("Data", data);
            res.status(200).send("Data captured");
        }
    }).catch(e => {
        console.log("Error", e)
    });
});

app.listen(PORT, () => console.log(`Wisdom Labs listening on port ${PORT}!`));