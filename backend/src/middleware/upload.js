const multer = require("multer");

// almacenar los archivos temporalmente en memoria
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // limitar el tamaño de los archivos a 20 MB
  },
  fileFilter: (req, file, cb) => {
    // permitir únicamente imágenes JPG y PNG
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG images are allowed."));
    }
  },
});

module.exports = upload;
