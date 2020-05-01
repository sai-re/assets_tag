const express = require('express');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use('/api', require('./routes/assets')); 

app.listen(PORT, () => console.log('Example app listening on port 4000!')); 