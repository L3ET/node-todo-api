const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userID = '5aa7cb1a249f850c7eab5653';
// var id = '5aa8cbbd67a3090d4db053c511';

if(!ObjectID.isValid(userID)){
    return console.log("ID not Valid");
}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     if(todo==null){
//        return console.log('Id not found');
//     }
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(todo==null){
//         return console.log('Id not found');
//      }
//     console.log('todo by ID', todo);
// }).catch((e)=>console.log(e));

User.findByIdAndRemove(userID).then((user)=>{
    if(!user){
        return console.log('User not found');
    }
    console.log('User : ',user);
}).catch((e)=>console.log(e));