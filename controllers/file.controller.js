const fs = require('fs')
const fileService = require('../services/file.services.js')
const File = require('../models/file.model.js')

class FileController {
  async createDir(req, res) {
    try {
      const { name, type,parent } = req.body
      const file = new File({ name, type ,parent})
      const parentFile = await File.findOne({_id: parent})
      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }

      await file.save()
      return res.json(file)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne({ _id: req.body.parent })

      let path
      if (!parent) {
        path = `${process.env.FILE_PATH}\\${file.name}`
      } else {
        path = `${process.env.FILE_PATH}\\${parent.path}\\${file.name}`
      }

      if (fs.existsSync(path))
        return res.status(400).json({ message: 'file already exist' })
      file.mv(path)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) filePath = parent.path + '\\' + file.name

      const dbFile = new File({
        name: file.name,
        type,
        path: filePath,
        parent: parent?._id,
      })

      await dbFile.save()
      res.json(dbFile)
    } catch (error) {
      log(error)
      res.status(400).json({ message: 'upload error' })
    }
  }
}

module.exports = new FileController()
