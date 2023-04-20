const { addUser, getLoggedInUser, searchUser, updateUser } = require("../controller/UserController");
const router = require("express").Router()

router.get("/getLoggedInUser", getLoggedInUser)
router.get('/search', searchUser)
router.put('/:userId', updateUser)
module.exports = router;
