const router = require("express").Router();
const addWorkout = require("../model/addworkoutstats.js");

router.post('/api/workouts', (req, res) => {
    addWorkout.create({}).then((dbWorkouts) => { res.json(dbWorkouts);
    }).catch((err) => { res.json(err)
        });
});

router.put('/api/workouts/:id', ({ body, params}, res) => {
   addWorkout.findByIdAndUpdate( params.id, { $push: { exercises: body} }, { new: true, runValidators: true })
   .then((dbWorkouts) => res.json(dbWorkouts)); 
}); 


router.get("/api/workouts", (req, res) => { addWorkout.aggregate([{$addfields: { totalDuration: {$sum: '$exercises.duration'},
},
},
]).then((dbWorkouts) => {
    res.json(dbWorkouts);
}).catch((err) => { res.json(err);});
});

router.get("/api/workouts/range", (req, res) => { addWorkout.aggregate ([ { $addfields: { totalDuration: { $sum: "$exercises.duration",
},
},
},
]).sort({ _id: -1 }).limit(7).then((dbWorkouts) => { console.log(dbWorkouts); }).catch((err) => { res.json(err);
}); 
});

router.delete('api/workouts', ({ body }, res) => { addWorkout.findByIdAndDelete(body.id).then(() => { res.json(true);}).catch((err) => { res.json(err);
});
});

module.exports = router;