const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose')

const bodyParser = require('body-parser'); //express middleware body-parser

//load mongoose models
const { List, Task } = require('./db/models')

//load middleware
app.use(bodyParser.json());

//cors headers middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from (* here)
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route handlers

// list routes

/*
GET /lists - get all lists
*/

app.get('/lists',(req, res)=>{
    //return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

/*
POST /lists - create a lists
*/

app.post('/lists',(req,res)=>{
    //create a new list and return new list back to the user
    //the list information fields will be passed through JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
        //the full list document is returned including id
        console.log("listdoc",listDoc);
        res.send(listDoc);
    })
})

/*
PATCH /lists - update the specified list
*/

app.patch('/lists/:id', (req, res) => {
//update the specified list with the new values specified in the JSON request body
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});


/*
DELETE /lists - delete a list
*/

 app.delete('/lists/:id', (req, res) => {
     //delete the specified list
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        // delete all the tasks that are in the deleted list
        // deleteTasksFromList(removedListDoc._id);
    })
})

// GET /lists/:listId/tasks - get all tasks in a specific list

app.get('/lists/:listId/tasks', (req,res)=>{
    //return all tasks that belong to a specific list
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
})
 

// POST /lists/:listId/tasks - create a task in a specific list

app.post('/lists/:listId/tasks', (req, res) => {
    //create a new task in a list specified by listId
    let newTask = new Task({
        title:req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc)
    })
})

// PATCH /lists/:listId/tasks/:taskId - update an existing list

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    //update an existing task specified by task id
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set:req.body
    }).then(()=>{
        res.send({'message':"updated successfully"});
    })
})

// DELETE /lists/:listId/tasks/:taskId - delete a task

app.delete('/lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})

