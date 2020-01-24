var express = require('express');
import { dataFrom0100, dataFrom6040 } from './db/db';
var cors = require('cors');
const app = express();


app.use(cors());

app.get('/get100Data', function(req,res,next){
  res.send({"100Data": dataFrom0100});
})

app.get('/get6040Data', function(req,res,next){
  res.send({"6040Data": dataFrom6040});
})


const PORT = 3306;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});