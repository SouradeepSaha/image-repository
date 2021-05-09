var express = require("express");
var router = express.Router();
const Image = require("../models/Image");

const uploadController = require("../controllers/upload");
const store = require("../middleware/upload");

/* GET home page. */
router.get("/", uploadController.home);

router.post("/upload", store.array("photos"), uploadController.uploads);

router.get("/delete/:id", async (req, res, next) => {
  await Image.findOneAndDelete({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.redirect("/");
  });
});

router.get("/update/private/:id/:private", async (req, res, next) => {
  var isPrivate = req.params.private == "true";

  await Image.findOneAndUpdate(
    { _id: req.params.id },
    { private: !isPrivate },
    function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.redirect("/");
    }
  );
});

module.exports = router;
