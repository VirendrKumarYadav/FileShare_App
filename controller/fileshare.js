const fileModal = require("../modal/fileshere");
const multer = require("multer");
const path = require("path");
const uploadFilePath = path.join(__dirname, "..", "uploadedFiles");
// const { v4: uuidv4 } = require("uuid");
const shortid = require("shortid");
const short_id = shortid.generate();
// ----------To upload the files 3rd party middleware -----------

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFilePath),
  filename: (req, file, cb) => {
    cb(null, short_id + path.extname(file.originalname));
  },
});
const uploadFile = multer({ storage: storage }).single("attachment");
//---------------------POST -----------------------------
const uploadOneFile = async (req, res) => {

  await uploadFile(req, res, async (err) => {
        try {
          if (err) {
            res.json({
              sucess: false,
              massage: "error to upload the File",
              err,
            });
          } else {
            console.log("File Uploaded Sucesfullly !");
            //------------------- below this ;ine or save modela as to save data in DB -------------------
            const newFile = new fileModal({
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
        } catch (e) {
          res.json({ err: e.message });
        }
  });

  // const insertData = new JobModal(req.body);
  // insertData.save();
  // res.json({
  //   sucess: true,
  //   massage: "Upload file API !",
  // });
};

const generateLink = async (req, res) => {
  try {
    const dbData = await fileModal.findById(req.params.udid);
    if (!dbData) {
      // Invalid file id
      return res.status(404).json({
        success: false,
        message: "File does not exist for the give ID",
      });
    }
    res.json({
      sucess: true,
      massage: "Generated Link for File",
      size: dbData.size / 1000 + " kb",
      downloadLink: `${process.env.API_BASE_URL_LOCAL}/files/download/${req.params.udid}`,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
const downloadFiles = async (req, res) => {
  try {
    const file = await fileModal.findById(req.params.udid);
if (!file) {
  // Invalid file id
  return res.status(404).json({
    success: false,
    message: "File does not exist for the give ID",
  });
}
    // console.log(file.path);

    // res.json({
    //   sucess: true,
    //   massage: "Downloaded File.",
    //   filename: file.filename,
    // });
    await res.download(file.path);
    
  } catch (err) {
    res.json({ error: err.message });
  }
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
