const Problem = require('../models/Problem');

const getProblems = async (req, res) => {
    try {
        
        const problems = await Problem.find({ user: req.user.id });
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addProblem = async (req, res) => {
    try {
        const { title, platform, rating, tags, status } = req.body;

        const problem = await Problem.create({
            title,
            platform,
            rating,
            tags,
            status,
            user: req.user.id 
        });

        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

       
        if (problem.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this' });
        }

        await problem.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProblems,
    addProblem,
    deleteProblem
};