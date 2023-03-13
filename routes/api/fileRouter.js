const express = require("express");
const path = require('path')

const router = express.Router();
const PICTURE_PATH = path.resolve("./public/avatars");


router.get(
  "/:fileName",
  express.static( PICTURE_PATH  )
);


module.exports = router;