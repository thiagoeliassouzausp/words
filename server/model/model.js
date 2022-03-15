const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    en_word : {
        type : String,
        required: true
    },
    pt_word : {
        type: String,
        required: true
        //,unique: true
    },

})

const Worddb = mongoose.model('worddb', schema);

module.exports = Worddb;