
const express = require("express");
const router = express.Router();;
const controller = require('../controller/fileshare');



router.post("/api/files", controller.uploadOneFile); // upload file api

router.get("/files/:udid",controller.generateLink) //File Link generations

router.get("/files/download/:udid",controller.downloadFiles); // Download files endpoints

router.get("/api/files/send-email",controller.sendFileLinksOnEmail); // send email


module.exports = router;