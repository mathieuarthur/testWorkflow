const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.pluralize(null);

const UserSchema = mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, default: "employee"},
    team: { type: Array, default: [] },
    workingTime: { type: Array, default: []}
});

UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Users', UserSchema);