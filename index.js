const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3001, () => {
    console.log('Server has been running');
});