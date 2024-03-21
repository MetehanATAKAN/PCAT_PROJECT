import express from 'express';
import { getImages,addImage, getImage, deleteImage, updateImage } from '../controllers/image.js';
import Images from '../models/Images.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = await multer.diskStorage({
    destination: (req,file,cb)=>{
        const uploadPath = path.resolve('C:\\Users\\matak\\OneDrive\\Masaüstü\\pcat\\client\\src\\images');
        return cb(null,uploadPath)
    },
    filename : (req,file,cb) => {
        console.log(file.originalname);
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage});

//get
router.get('/getAllImages',getImages);

// add image
router.post('/addImage', upload.single('file'),addImage)

//get image
router.get('/getImage/:id',getImage);

//delete image
router.get('/deleteImage/:id',deleteImage);

//update image
router.post('/updateImage/:id',upload.single('file'),updateImage);

export default router;