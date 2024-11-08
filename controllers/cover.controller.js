const Cover = require("../models/cover.model");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

class CoverController {
  async createCover(req, res) {
    const poster = await req.files.poster;

    try {
      // 1. Створення запису в БД
      const coverData = {
        ...req.body,
      };
      const cover = await Cover.create(coverData);

      
      if (poster) {
        const formData = new FormData();
        formData.append("id", cover._id.toString());

        const posterPath = poster.tempFilePath || `./temp/${poster.name}`;
        if (!poster.tempFilePath) {
          fs.writeFileSync(posterPath, poster.data);
        }

        const posterStream = fs.createReadStream(posterPath);
        formData.append("poster", posterStream, {
          filename: poster.name,
          contentType: poster.mimetype,
        });

        const posterUploadResponse = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );
        if (!poster.tempFilePath) {
          fs.unlinkSync(posterPath);
        }

        if (posterUploadResponse.status !== 200) {
          return res.status(400).json({ message: "Poster upload failed" });
        }
      }
      res.status(200).json({ message: "Cover created successfully", cover });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Poster upload failed" });
    }
    // try {
    //   if (poster) {
    //     const posterUploadResponse = await axios.post(
    //       "",
    //       poster
    //     );
    //     if (posterUploadResponse.status === 200) {
    //       console.log(posterUploadResponse);

    //     } else {
    //       return res.status(400).json({ message: "Poster upload failed" });
    //     }
    //   }
    //   res.status(201).json({'message':poster})
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).json({ message: "Cover creation failed", error });
    // }

    // const data = await req.formData();
    // const videos = data.getAll("videos");
    // const poster = data.get("poster");

    // const videoPaths = [];

    // try {

    //   if (poster) {
    //     const imageFormData = new FormData();
    //     const imagePath = `${process.env.FILE_PATH}\\${poster.name}`;

    //     // Використовуємо mv() для збереження постера
    //     await poster.mv(imagePath);

    //     const imageStream = fs.createReadStream(imagePath);
    //     imageFormData.append("file", imageStream);

    //     const imageUploadResponse = await axios.post(
    //       "http://localhost:5000/api/upload",
    //       imageFormData,
    //       {
    //         headers: imageFormData.getHeaders(),
    //       }
    //     );

    //     if (imageUploadResponse.status === 200) {
    //       const posterPath = imageUploadResponse.data.paths[0];
    //     } else {
    //       return res.status(400).json({ message: "Poster upload failed" });
    //     }
    //   }

    //   // Завантаження відео
    //   if (videos) {
    //     const videoFormData = new FormData();
    //     const videoPath = `${process.env.FILE_PATH}\\${videos.name}`;

    //     await videos.mv(videoPath);

    //     const videoStream = fs.createReadStream(videoPath);
    //     videoFormData.append("file", videoStream);

    //     const videoUploadResponse = await axios.post(
    //       "http://localhost:5000/api/upload",
    //       videoFormData,
    //       {
    //         headers: videoFormData.getHeaders(),
    //       }
    //     );

    //     if (videoUploadResponse.status === 200) {
    //       videoPaths.push(videoUploadResponse.data.paths[0]);
    //     } else {
    //       return res
    //         .status(400)
    //         .json({ message: `Video upload failed for ${videos.name}` });
    //     }
    //   }

    //   res.status(201).json({ cover });
    // } catch (error) {
    //   console.error(error);
    //   res.status(400).json({ message: "Cover creation failed", error });
    // }
  }
  async getAllCovers(req, res) {
    //треба буде доробити виведення по ліміту та постранично

    //     const page = 2; // приклад для другої сторінки
    // const limit = 10;

    // fetch(`/api/covers?page=${page}&limit=${limit}`)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));
    // const covers = await Cover.find().sort({createdAt: -1}).skip(((page-1)*limit)).limit(limit)

    const covers = await Cover.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name type genre slug")
      .populate("poster", "name path");
    res.status(200).json({ covers: covers });
  }

  async getCover(req, res) {
    const { slug } = req.params;
    const cover = await Cover.findOne({ slug }).populate("poster", "name path");
    res.status(200).json({ cover: cover });
  }

  async updateCover(req, res) {
    const updatedCover = await Cover.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ msg: "cover modified", cover: updatedCover });
  }

  async deleteCover(req, res) {
    const removedCover = await Cover.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "cover was deleted", cover: removedCover });
  }
}

module.exports = new CoverController();
