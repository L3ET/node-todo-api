const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const validator = require('validator');

var app = express();

const port = process.env.PORT || 1337;

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});



// User Area Start

app.post('/users',(req, res)=>{
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then((user)=>{
       return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.get('/users',(req, res)=>{
    User.find().then((users)=>{
        res.send({users});
    }, (e)=>{
        res.status(400).send(e);
    });
});


app.get('/users/me',authenticate ,(req, res)=>{
    res.send(req.user);
});

app.get('/users/:id', (req, res)=>{
    console.log('sd');
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findById(id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.delete('/users/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findByIdAndRemove(id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.patch('/users/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['email', 'password', 'newPassword']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    
    if(body.newPassword){
        if(_.isString(body.newPassword) && body.newPassword.length >= 6){
            var update_set = {email: body.email, password: body.newPassword};
        }else{
            return res.status(404).send("Please enter valid new password");
        }
        
    } else {
        var update_set = {email: body.email};
    }

    if(validator.isEmail(body.email) && body.email && _.isString(body.email) && body.password){
        User.findById(id).then((user)=>{
            var pass = user.password;
            if(body.password==pass){
                User.findByIdAndUpdate(id, {$set: update_set}, {new: true}).then((user)=>{
                    if(!user){
                        return res.status(404).send();
                    }
                    res.send(user);
                }).catch((e)=>{
                    res.status(400).send();
                });
            }else{
                return res.send("pass not matched");
            }
        }, (e)=>{
            res.status(400).send("User not found.")
        })
    }else{
        res.send("Please enter correct value");
    }
});


app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app}