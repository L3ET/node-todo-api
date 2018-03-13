// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/',(err, client)=>{
    if(err){
        return console.log("Unable to connect MongoDB server");
    }
    console.log("Connected to MongoDB server");
    
    // var find = client.db('TodoApp').collection('Todos').find().toArray().then((docs)=>{
    //     console.log('Todos'); 
    //     console.log(JSON.stringify(docs,undefined, 2));
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });
    var name = {name: 'Savan'}
    var find = client.db('TodoApp').collection('Users').find(name).toArray().then((docs)=>{
        console.log('Todos'); 
        console.log(JSON.stringify(docs,undefined, 2));
        
    },(err)=>{
        console.log('Unable to fetch todos', err);
    });

    var c = client.db('TodoApp').collection('Users').find(name).count().then((count)=>{
        console.log(`Count: ${count}`);
    },(err)=>{
        console.log(err);
    });

    client.close();
}); 