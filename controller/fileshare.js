const fileModal = require("../modal/fileshere");
const multer = require("multer")
const path = require("path");
const uploadFilePath = path.join(__dirname, "..", "uploadedFiles");
const { v4:uuidv4 } =require("uuid");
// ----------To upload the files 3rd party middleware -----------


let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFilePath),
  filename: (req, file, cb) => {
   
    cb(null, uuidv4()+path.extname(file.originalname));
  },
});
const uploadFile = multer({ storage:storage }).single("attachment");


//---------------------POST -----------------------------
const uploadOneFile = async (req, res) => {
  
  await uploadFile(req, res, async(err) => {
    
    if(err){
      res.json({
        sucess: false,
        massage:"error to upload the File", err,
      });
    } else {
      console.log("File Uploaded Sucesfullly !");
      //------------------- below this ;ine or save modela as to save data in DB -------------------
      const newFile =  new fileModal({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      
      });
      const newFileInsrted = await newFile.save();
      

       res.json({
         sucess: true,
         massage: "File Uploaded Sucesfullly !",
         file_id: newFileInsrted._id, // uuid for save file data
       });
    }
  }) 
  
  
  // const insertData = new JobModal(req.body);
  // insertData.save();
  // res.json({
  //   sucess: true,
  //   massage: "Upload file API !",
  // });
};

const generateLink = (req, res) => {
   res.json({
     sucess: true,
     massage: "Generate like for File API !",
   });
 }
const downloadFiles = (req, res) => {
   res.json({
     sucess: true,
     massage: "Download File API !",
   });
 };
const sendFileLinksOnEmail = (req, res) => {
   res.json({
     sucess: true,
     massage: "send File Link to Email API !",
   });
};


module.exports = {
  uploadOneFile,
  generateLink,
  downloadFiles,
  sendFileLinksOnEmail,

};
