require('dotenv').config()

const express = require('express');
const router = require('./routes/index.js');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})