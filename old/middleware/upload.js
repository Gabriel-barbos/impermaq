const path = require('path')
const multer = require('multer')

var storate = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'/server/uploads' )
    },
    filename: function(req, file,   cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
    if  (
       file.mimetype ==  "image/png" || 
       file.mimetype ==  "image/jpg" || 
       file.mimetype ==  "image/jpeg"
    ){
            callback(null,true)
    }else{
        console.log('formato invalido')
        callback(null, false)
    }

    },
    limits: { fileSize: 1024 * 1024 * 5 }
})

module.exports = upload