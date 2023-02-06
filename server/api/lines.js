const express = require('express');
const router = express.Router();

const { models:{ Line }} = require('../models/index');

router.get('/', async(req,res,next) => {
  try{
    const id = 1 + Math.floor((837 - 1 + 1) * Math.random());
    const line = await Line.findByPk(id);
    res.send(line);
  } catch(error){
    next(error);
  }
});

module.exports = router;