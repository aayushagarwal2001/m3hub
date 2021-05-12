const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/student',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const student = new Schema({
    username:String,
    branch:String,
    rollNo:String,
    Email:String,
    password:String,
});

student.plugin(passportLocalMongoose);

module.exports = mongoose.model('Student', student);