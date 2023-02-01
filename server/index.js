const { syncAndSeed, db } = require('./seed');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const init = async() => {
  try{
    await syncAndSeed();
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  } catch(error){
    console.log(error);
  }
};

init();