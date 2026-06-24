const express = require('express');
const router = express.Router();
const { getProblems, addProblem, deleteProblem } = require('../controllers/problemController');

router.route('/').get(getProblems).post(addProblem);
router.route('/:id').delete(deleteProblem);

module.exports = router;
