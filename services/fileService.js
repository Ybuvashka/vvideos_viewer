const fs = require('fs')

class FileService{
     
    createDir(file){
        const filePath = `${process.env.FILE_PATH}\\${file.path}`
        return new Promise((resolve, reject)=>{
            try{
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'file was created'})
                }else{
                    return reject({message:'file already exist'})
                }
            }catch(error){
                return reject({message: 'file error',error})
            }
        })
    }
}

module.exports = new FileService()