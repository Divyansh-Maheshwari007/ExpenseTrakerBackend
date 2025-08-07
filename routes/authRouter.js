
const express = require("express");
const {protect} =  require("../middleware/authMiddleware");
const { registerUser, loginUser,getUserInfo} = require("../controllers/authController");
const uploard = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect , getUserInfo);

router.post("/uploard-image", uploard.single("image"),(req,res) =>{
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}: // ${req.get("host")}/uploard/${req.file.fieldname}`
});



module.exports = router;

