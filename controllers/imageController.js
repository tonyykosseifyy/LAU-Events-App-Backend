const uploadImage = async (req, res) => {
  try {
    const imagePath = req.file.path;

    return res
      .status(200)
      .send({ message: "Image uploaded successfully", imagePath });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "An error occurred while uploading the image." });
  }
};

module.exports = {
  uploadImage,
};
