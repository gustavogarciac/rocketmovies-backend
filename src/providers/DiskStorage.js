/* This is responsible for saving archives and deleting archives. */
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    /* This method below is responsible for changing the image folder from tmp folder to uploads folder. */
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath); // Responsible for returning the file status.
    } catch {
      return;
    }

    /* This method below is actually responsible for deleting the file. */
    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
