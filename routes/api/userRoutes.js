const router = require('express').Router();

const { getUsers, createUser, getUserByID, updateUser, deleteUser }=require('../../controllers/userController')


router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getUserByID).put(updateUser).delete(deleteUser)








module.exports = router;