const cloudinary = require("../config/cloudinary");

// subir una imagen a Cloudinary
const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(file.buffer);
  });
};

// Eliminar una imagen de Cloudinary mediante su identificador público
const deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImage, deleteImage };
