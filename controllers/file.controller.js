const fs = require("fs");
const File = require("../models/file.model.js");

class FileController {
  async uploadFile(req, res) {
    console.log("file upload start");

    const { _id, files } = req;
    console.log(_id);
    
    const filePath = `${process.env.FILE_PATH}\\${_id}`;
    const returnPaths = [];
  
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }



      for (const file of files) {
        const uploadFilePath = `${filePath}\\${file.name}`;

        if (fs.existsSync(uploadFilePath)) {
          return res.status(400).json({ message: "File already exists" });
        }

        // Переміщуємо файл
        await new Promise((resolve, reject) => {
          file.mv(uploadFilePath, (err) => {
            if (err) reject(err);
            resolve();
          });
        });

        // Створюємо запис в БД
        const dbFile = new File({
          name: file.name,
          path: uploadFilePath,
        });

        returnPaths.push(uploadFilePath);

        await dbFile.save();
      }

      console.log("file upload end");

      res
        .status(200)
        .json({ message: "Files uploaded successfully", paths: returnPaths });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Upload error" });
    }
  }
}

module.exports = new FileController();
