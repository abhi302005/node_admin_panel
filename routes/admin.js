const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    const FILE_EXT = [".jpg", ".jpeg", ".png", ".webp"];
    let fileEXT = path.extname(file.originalname);

    if (FILE_EXT.includes(fileEXT)) {
      // ? if all file are valid then only this callback function is going to run.
      cb(null, Date.now() + path.extname(file.originalname));
    }
  },
});

const upload = multer({ storage: storage });
// /admin/add-product => GET
router.get("/", adminController.mainPage);

router.route("/category").get(adminController.fetchCategory);
router
  .route("/category/add_new")
  .post(upload.array("file", 1), adminController.createCategory);
router.route("/category/update").post(adminController.updateCategory);
router.route("/category/delete").post(adminController.deleteCategory);

// router
//   .route("/products")
//   .get(adminController.fetchProducts)
//   .post(adminController.addProduct)
//   .patch(adminController.updateProduct)
//   .delete(adminController.deleteProduct);
// router.get("/user_info", adminController.fetchUser_info);
// router.get("/orders", adminController.orders);

// /admin/products => GET
// router.get("/products", adminController.fetchProduct);

// router.post("/add-product", adminController.getAddProduct);
// /admin/add-product => POST
// router.post("/add-product", adminController.postAddProduct);
module.exports = router;
