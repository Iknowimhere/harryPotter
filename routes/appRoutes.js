const router = require("express").Router();
const multer = require("multer");
const storage = require("../middlewares/multer");
const Person = require("../models/Person");
const fs = require("fs");
const upload = multer({ storage: storage }).single("photo");

router.get("/", async (req, res) => {
  const success = req.flash("success");
  const users = await Person.find();
  res.render("index", { title: "Home", success, users });
});

router.get("/add", (req, res) => {
  res.render("add", { title: "Create" });
});

router.post("/add", upload, async (req, res) => {
  const payload = { ...req.body };
  try {
    await Person.create({ ...payload, photo: req.file.filename });
    req.flash("success", "User added Successfully");
    res.redirect("/app/v1/persons/");
  } catch (error) {
    res.locals.error = error.message;
    res.json({
      message: error.message,
      type: "danger",
    });
  }
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  res.render("update", { title: "Update", person });
});

router.put("/update/:id", upload, async (req, res) => {
  try {
    const { id } = req.params;
    const photo = req.file.filename;
    const existingPerson = await Person.findById(id);
    if (existingPerson.photo) {
      fs.unlinkSync(`./public/uploads/${existingPerson.photo}`);
      console.log("file deleted");
    }
    const payload = { ...req.body, photo };
    await Person.findByIdAndUpdate(id, payload);
    req.flash("success", "User updated successfully");
    res.redirect("/app/v1/persons");
  } catch (error) {
    res.locals.error = error.message;
    res.json({
      message: error.message,
      type: "danger",
    });
  }
});

router.delete("/delete/:id", upload, async (req, res) => {
  try {
    const { id } = req.params;
    const existingPerson = await Person.findById(id);
    if (existingPerson.photo) {
      fs.unlinkSync(`./public/uploads/${existingPerson.photo}`);
      console.log("file deleted");
    }
    await Person.findByIdAndDelete(id);
    req.flash("success", "User Deleted successfully");
    res.redirect("/app/v1/persons");
  } catch (error) {
    res.locals.error = error.message;
    res.json({
      message: error.message,
      type: "danger",
    });
  }
});
module.exports = router;
