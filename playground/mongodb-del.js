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
    
    // var del = client.db('TodoApp').collection('Todos').deleteMany({completed: true}).then((del)=>{
    //     console.log(del);
    // },(err)=>{
    //     console.log(err);
    // });

    // client.db('TodoApp').collection('Todos').deleteOne({completed: false}).then((del)=>{
    //     console.log(del);
    // },(err)=>{
    //     console.log(err);
    // });

    client.db('TodoApp').collection('Todos').findOneAndDelete({_id: new ObjectID('5aa77b4eeb9ec9a25c59a702')}).then((del)=>{
        console.log(del);
    },(err)=>{
        console.log(err);
    });

    client.close();
}); 