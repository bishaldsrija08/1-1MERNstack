const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = require('express').Router();

router.route("/blogs").post(createBlog).get(getAllBlogs);
router.route("/blogs/:id").get(getSingleBlog).patch(updateBlog).delete(deleteBlog)

module.exports = router;