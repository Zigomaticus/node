const { Router } = require("express");
const router = Router();
const Course = require("../models/course");

router.get("/", async (req, res) => {
  const courses = await Course.find().lean();

  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses,
  });
});

router.post("/edit", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body).lean();
  res.redirect("/courses");
});


router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const course = await Course.findById(req.params.id).lean();

  res.render("course-edit", {
    title: `Edit ${course.title}`,
    course,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).lean();
  res.render("course", {
    layout: "empty",
    title: `Course ${course.title}`,
    course,
  });
});

module.exports = router;
