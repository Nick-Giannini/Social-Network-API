const router = require('express').Router();
const { getUsers, createUser, getUserByID, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUserByID).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;