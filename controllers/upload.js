const fs = require("fs");
const ImageModel = require("../models/Image");

exports.home = async (req, res) => {
  var imgList;
  if (req.isAuthenticated()) {
    imgList = await ImageModel.find({
      $or: [{ private: false }, { user: req.user._id }],
    });
    res.render("index", { images: imgList, user: req.user._id });
  } else {
    imgList = await ImageModel.find({ private: false });
    res.render("index", { images: imgList, user: null });
  }
};

exports.uploads = (req, res, next) => {
  const private = req.body.private ? true : false;
  console.log(private);
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose at least one file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let imgArr = files.map((file) => {
    let img = fs.readFileSync(file.path);
    return (encode_image = img.toString("base64"));
  });

  let result = imgArr.map((src, index) => {
    let finalImg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
      private: private,
      user: req.user,
    };

    let newImage = new ImageModel(finalImg);
    return newImage
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} uploaded successfully` };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `Duplicate ${files[index].originalname}`,
            });
          }
          return Promise.reject({
            error:
              error.message || `Cannot upload ${files[index].originalname}`,
          });
        }
      });
  });

  Promise.all(result)
    .then((msg) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
};
