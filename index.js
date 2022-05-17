const express = require('express');
const cors = require('cors');
const mongo = require('./shared')
const mentorrouter = require('./router/mentor')


const app = express();

app.use(express.json());

app.use(cors());

mongo.Connect();

app.use('/mentor', mentorrouter);

app.listen(process.env.PORT || 3000)