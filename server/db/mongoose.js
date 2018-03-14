var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
if(process.env){
    mongoose.connect('mongodb://leet1337:leet123@ds113019.mlab.com:13019/todoapp');
}else{
    mongoose.connect('mongodb://localhost:27017/TodoApp');
}
module.exports = {
    mongoose
};