import multer from "multer";
import crypto from "crypto"
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => {
            const fn = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, fn);
        });
    }
});

export const upload = multer({ storage: storage })

// const storage1 = multer.memoryStorage();
// export const singleUpload = multer({storage1}).single("file")
