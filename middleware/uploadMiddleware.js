const multer = require("multer");

// Configure Storage
const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploard/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

//File filter

const fileFilter = (req,file,cb)=>{
    const allowedType = ['image/jpeg','image/png',
        'image/jpg'
    ];
    if(allowedType.includes(file.mimetype)){
        cb(null,true);
    } else{
        cb(new Error(`Only .jpeg, .jpg, and .png format s are allowed`), false)
    }
};

const uploard = multer({Storage,fileFilter});
module.exports = uploard;