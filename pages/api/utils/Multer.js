const multer = require("multer");
const DataUri = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const multerUploads = multer({ storage });

const dUrl = new DataUri();

const dataUri = (req) =>
  dUrl.fileName(
    path.extname(req.file.originalname.toString(), req.file.buffer)
  );

module.exports = { multerUploads, dataUri };
