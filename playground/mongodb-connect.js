// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
 

MongoClient.connect('mongodb://localhost:27017/',(err, client)=>{
    if(err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    // client.db('TodoApp').collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err, result)=>{
    //     if(err){
    //         return console.log("Unable to insert todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // client.db('TodoApp').collection('Users').insertOne({
    //     name: 'LEET',
    //     age: 21,
    //     location: 'Ahmedabad'
    // },(err, result)=>{
    //     if(err){
    //         return console.log("Unable to insert users", err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    client.close();
});