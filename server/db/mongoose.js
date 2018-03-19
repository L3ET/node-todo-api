var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
//console.log(process.env.USER != 'yudizsolutions');
if(process.env.USER != 'yudizsolutions'){
    mongoose.connect('mongodb://leet1337:leet123@ds113019.mlab.com:13019/todoapp');
}else{
    mongoose.connect('mongodb://leet1337:leet123@ds113019.mlab.com:13019/todoapp');
}
module.exports = {
    mongoose
};