const path = require("path");

const { uploader } = require("../utils/cloudinary");
const response = require("../utils/response");

const welcomePage = (req, res) => {
  //   res.json({
  //     msg: "Selamat Datang di Toko Kopi API",
  //   });
  res.status(200).sendFile(path.join(__dirname, "../html/welcome.html"));
};

const cloudUpload = async (req, res) => {
  try {
    // upload ke cloud
    const { data, err, msg } = await uploader(req, "Welcome", 1);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    res.status(201).json({ data, msg });
  } catch (error) {
    response.error(res, { status: 500, msg: error.err.message });
  }
};

module.exports = {
  welcomePage, // welcomePage: welcomePage
  cloudUpload,
};
