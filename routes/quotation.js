const express = require("express");
const router = express.Router()

//controllers
const { postQuotation } = require("../controller/quotation/quotation")

//route
router.route("/post").post(postQuotation)

//export
module.exports = router