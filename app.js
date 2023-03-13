const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/.env") });
// console.log("data", process.env.S3_BUCKET); //e remove this after you've confirmed it is working

const errorController = require("./controllers/error");

const app = express();

// setting up the template engine
app.set("view engine", "ejs");
app.set("views", "views");

// for admin-routes
const adminRoutes = require("./routes/admin");

// for shop-routes.
const shopRoutes = require("./routes/shop");

// setting up the body-parser
// app.use(bodyParser.urlencoded({ extended: false }));
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up the pubic dir. for frontend files
app.use(express.static(path.join(__dirname, "public")));

// routes for admin
app.use("/admin", adminRoutes);
// routes for user.
app.use(shopRoutes);

// fall-back routes.
app.use(errorController.get404);

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
