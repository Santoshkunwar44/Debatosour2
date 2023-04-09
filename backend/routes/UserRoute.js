const { addUser, getLoggedInUser, searchUser } = require("../controller/UserController");
const router = require("express").Router()

router.get("/getLoggedInUser", getLoggedInUser)
router.get('/search', searchUser)
module.exports = router;
