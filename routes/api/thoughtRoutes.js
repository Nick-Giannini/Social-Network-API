const router = require('express').Router();

const { getThought, createThought, getThoughtByID, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtsController')


router.route('/').get(getThought).post(createThought)

router.route('/:thoughtId').get(getThoughtByID).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)








module.exports = router;