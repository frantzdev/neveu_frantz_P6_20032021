//importation de mongoose 
const mongoose = require('mongoose');
//importation de unique validator
const uniqueValidator = require('mongoose-unique-validator');
//creation du model User
const userSchema = mongoose.Schema({
    email: {type: String, require: true, useCreateIndex: true},
    password: {type: String, require: true}
});

//utilisation du plugin ( unique validator sur le model User)
userSchema.plugin(uniqueValidator);

//exportation du model User
module.exports = mongoose.model('User', userSchema);