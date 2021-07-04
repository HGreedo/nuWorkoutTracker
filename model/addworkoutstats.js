const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutStats = new Schema({

    day: { type: Date, default: () => new Date(),},

    typeOfExcercise: [
        {
        type: {
            type: String, 
            trim: true, 
            required: "What kind of Exercise did you complete?",
        },
        name: {
            type: String,
            trim: true,
            required: "Enter the name of your exercise(s)"
        },
        duration: {
            type: String,
            trim: true,
            required: "How long was your workout? (minutes)",
        },
        weight: {
            type: Number,
            required: "Kilograms or Pounds?",
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        },
    },
    ],

});

const newWorkout = mongoose.model('newWorkout', workoutStats)

module.exports = newWorkout;