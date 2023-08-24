const env = require("dotenv").config().parsed;

const uploadImage = async (req, res) => {
  try {
    console.log("here")
    const fileName = req.file.filename;
    const imageUrl = `images/${fileName}`;

    return res
      .status(200)
      .send({ message: "Image uploaded successfully", imageUrl });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "An error occurred while uploading the image." });
  }
};

module.exports = {
  uploadImage,
};

module.exports = {
  uploadImage,
};
