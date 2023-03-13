const prodDetails = require("../models/product_details");
const prodCategory = require("../models/product_category");

exports.mainPage = (req, res, next) => {
  res.render("admin/index");
};

// ─── Category--controllers ───────────────────────────────────────────────────

exports.fetchCategory = (req, res, next) => {
  res.render("admin/category", {
    error: false,
  });
};
exports.createCategory = (req, res, next) => {
  let categoryImg = null;
  req.files.find(({ filename }) => {
    categoryImg = filename;
  });

  const newCategory = {
    categoryImg: categoryImg,
    categoryName: req.body.title,
  };
  if (newCategory.categoryImg == null) {
    res.render("admin/category", {
      error: true,
      message: "Please upload Image of type: [.jpg, .jpeg, .png, .webp]",
    });
  }
  prodCategory.find({ categoryName: newCategory.categoryName }).then((doc) => {
    // ? if document not exist add_new
    if (doc.length == 0) {
      prodCategory.create(newCategory).then((err, result) => {
        if (err) {
          res.render("admin/category", {
            error: true,
            message: "an unexpected error occurred",
          });
        }
        // ? after add render to "admin/category"
        res.render("admin/category", {
          error: false,
        });
      });
    } else {
      // ? if category exits already
      res.render("admin/category", {
        error: true,
        message: "Category exists",
      });
    }
  });
};
exports.updateCategory = (req, res, next) => {
  res.render("admin/index");
};
exports.deleteCategory = (req, res, next) => {
  res.render("admin/index");
};

// ─── Product--controller ─────────────────────────────────────────────────────

exports.fetchProducts = (req, res, next) => {
  res.render("admin/index");
};

exports.addProduct = async (req, res, next) => {
  const newItem = {
    prodName: res.body.prodName,
    prodDesc: res.body.prodDesc,
    productQty: res.body.prodQty,
    prodCategory: res.body.prodCategory,
    prod_mrp: res.body.prod_mrp,
    prod_salePrice: res.body.prod_salePrice,
    isFeatured: res.body.isFeatured,
    prodStatus: res.body.prodStatus,
  };
  // const prodName = res.body.prodName;
  // const prodDesc = res.body.prodDesc;
  // const productQty = res.body.prodQty;
  // const prodCategory = res.body.prodCategory;
  // const prod_mrp = res.body.prod_mrp;
  // const prod_salePrice = res.body.prod_salePrice;
  // const isFeatured = res.body.isFeatured;
  // const prodStatus = res.body.prodStatus;

  await prodDetails.create(newItem);
  /*  => product image
  const prodImg1 = undefined;
  const prodImg2 = undefined;
  const prodImg3 = undefined;
  const prodImg4 = undefined; */
  res.redirect("admin/product");
};
exports.updateProduct = (req, res, next) => {
  res.render("admin/index");
};
exports.deleteProduct = (req, res, next) => {
  res.render("admin/index");
};
// ─────────────────────────────────────────────────────────────────────────────

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
