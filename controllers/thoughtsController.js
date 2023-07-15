const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {

   async getThought(req, res) {
    console.log("route hit");
    try {
        const thought = await Thought.find();
        console.log(thought
            );
        return res.json(thought);
    } catch (err) {

        console.log(err);
        return res.status(500).json(err);
    }
},
    async createThought(req, res) {
    try {
        const newThought = await Thought.create(req.body);
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
},
    async getThoughtByID(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No Thought with that ID' })
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
    async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No Thought with this id!' });
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No such Thought exists with that id' });
            }
            console.log("delete route");
            console.log(thought);

            // const thought = await Thought.findOneAndUpdate(
            // );

            // if (!course) {
            //     return res.status(404).json({
            //         message: 'Student deleted, but no courses found',
            //     });
            // }

            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},
    async addReaction(req, res) {
        console.log('You are adding a Reaction');
        console.log(req.params);

        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought updated :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId } } },
                { new: true });
                
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);

        } catch (err) {
            res.status(400).json(err);
        }
    }

};