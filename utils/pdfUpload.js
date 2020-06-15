
const multer = require('multer');


//MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf');
    },

    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.${ext}`);
        // cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.pdf`);
    }
})


const multerFilter = (req, file, cb) => {
    // // check ext
    const fileTypes = /pdf/;
    const ext = file.mimetype.split('/')[1];
    const checkExt = fileTypes.test(ext);


    //check both mimetype and ext
    // pdf: application/pdf
    if (file.mimetype.startsWith('application') && checkExt){
        cb(null, true);
    }else{
        const ERROR = {message: 'Format not supported. Format should be .pdf'}
        cb (ERROR, false)
    }
}

//Multer Config
const upload = multer({
    storage: multerStorage,
    fileFilter:  multerFilter,
    limits: {fileSize: 3000000} //3mb
});

const uploadPDF = upload.fields([
    {name: 'resume', maxCount: 1},
    {name: 'coverLetter', maxCount: 1}
]);


module.exports = uploadPDF;