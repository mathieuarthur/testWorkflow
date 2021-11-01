const mongoose = require('mongoose');
mongoose.pluralize(null);

const workingTime = mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true},
});

module.exports = mongoose.model('workingTime', workingTime);