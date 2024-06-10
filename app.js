const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/schedule', (req, res) => {
    const trainData = req.body;

    if (!Array.isArray(trainData) || trainData.length === 0) {
        return res.status(400).send('Trains are not sheduled');
    }

    for (const train of trainData) {
        const { train_line, times } = train;

        if (!train_line || !Array.isArray(times) || train_line.length > 10) {
            return res.status(400).send('Invalid train input');
        }

        db.set(train_line, times);
    }

    res.status(200).send('Schedule is added');
});

// Endpoint to retrieve all train details
app.get('/', (req, res) => {
    const allTrainDetails = {};

    const keys = db.keys(); // Use db.keys() to get all train lines

    for (let key of keys) {
        allTrainDetails[key] = db.fetch(key);
    }

    res.status(200).json(allTrainDetails);
});


// Endpoint to get the next simultaneous arrival time
app.get('/next_simultaneous_arrival', (req, res) => {
    const currentTime = req.query.time;

    if (!currentTime) {
        return res.status(400).send('Time parameter is missing');
    }

    if (!moment(currentTime, 'hh:mm A', true).isValid()) {
        return res.status(400).send('Invalid time format');
    }

    const currentMoment = moment(currentTime, 'hh:mm A');
    const allSchedules = {};
    const keys = db.keys(); // Use db.keys() to get all train lines

    for (let key of keys) {
        const times = db.fetch(key);
        allSchedules[key] = times.map(time => moment(time, 'hh:mm A'));
    }

    const timeCounts = {};

    for (let times of Object.values(allSchedules)) {
        for (let time of times) {
            const timeString = time.format('hh:mm A');
            if (timeCounts[timeString]) {
                timeCounts[timeString]++;
            } else {
                timeCounts[timeString] = 1;
            }
        }
    }

    const simultaneousTimes = Object.keys(timeCounts)
        .filter(time => timeCounts[time] > 1)
        .sort((a, b) => moment(a, 'hh:mm A').diff(moment(b, 'hh:mm A')));

    let nextTime = simultaneousTimes.find(time => moment(time, 'hh:mm A').isAfter(currentMoment));

    if (!nextTime && simultaneousTimes.length) {
        nextTime = simultaneousTimes[0];
    }

    if (!nextTime) {
        return res.status(200).json({ next_simultaneous_arrival: null });
    }

    res.status(200).json({ next_simultaneous_arrival: nextTime });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
