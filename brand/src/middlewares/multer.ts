import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadPhotos = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
