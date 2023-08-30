const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts GET all and POST thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid
router
.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtid/reactions 
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtid/reactions/:reactionid
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;