// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/',(err, client)=>{
    if(err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    
    // client.db('TodoApp').collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5aa77b10eb9ec9a25c59a6f8')
    // },{
    //     $set :{
    //         completed: false
    //     }
    // }).then((update)=>{
    //     console.log(update);
    // },(err)=>{
    //     console.log(err);
    // });

    client.db('TodoApp').collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aa75d532f08e21aff292fa0')
    },{
        $inc :{
            age: 1
        }
    }).then((update)=>{
        console.log(update);
    },(err)=>{
        console.log(err);
    });

    client.close();
}); 