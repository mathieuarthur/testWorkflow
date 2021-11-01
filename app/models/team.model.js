const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.pluralize(null);

const TeamSchema = mongoose.Schema(
{
    name: { type: String, required: true },
    member: { type: Array, default: []},
    supervisor: { type: 
    {
        name: { type: String, required: true},
        id: { type: Number, required: true}
    }, required: true},
    workingTime: { type: Array, default: []}
});

TeamSchema.plugin(AutoIncrement, {inc_field: 'teamId'});
module.exports = mongoose.model('Team', TeamSchema);