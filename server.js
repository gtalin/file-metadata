const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const upload = multer();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use('/public', express.static(path.join(__dirname,'/public')));

app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname,'/views/index.html'));
})

app.post("/api/fileanalyse", upload.single('upfile'), (req, res)=>{
  let fileObj;
  if (req.file) {
    fileObj = {
      filename:req.file.originalname,
      size: req.file.size
    }
    return res.json(fileObj);
  }
  else {
    res.status(400)
       .json({msg:'No file uploaded'})
  }
})

app.listen(process.env.PORT||3000, ()=>{
    console.log("Node started up");
})
