const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
console.log(process)
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})