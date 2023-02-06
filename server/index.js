const { syncAndSeed, db } = require('./seed');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const linesAPI = require('./api/lines');

app.use(express.json());

app.use('/api/lines', linesAPI);

const init = async() => {
  try{
    await syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  } catch(error){
    console.log(error);
  }
};

init();