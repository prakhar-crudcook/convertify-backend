import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = `./tmp/${req.sessionId}/original`;
    cb(null, `${uploadDir}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
