const express =require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const PORT =4000;
const todoRoutes =express.Router();

let Todo = require('./models/todo-model');

app.use(cors());
app.use(bodyParser.json());

//connecting to mongodb with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/todos',{
    useNewUrlParser:true
});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("mongodb database connection established successfully");
})



// retrieve a list of all todo items from the MongoDB database
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err,todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
        return todos
    });
   
});
// retrieve an issue item based on it’s ID.
todoRoutes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    Todo.findById(id,(err,todo)=>{
        res.json(todo);
    })
})

todoRoutes.route('/add').post((req,res)=>{
    let todo = new Todo(req.body);
    //new todo is saved to the database
    todo.save()
        .then(todo=>{
            res.status(200).json({'todo':'todo added successfully'})
        })

        .catch(err =>{
            res.status(400).send('adding new todo failed');
        });    
});

//HTTP POST route /update/:id is added:

todoRoutes.route('/update/:id').post((req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(!todo)
            res.send("data not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed= req.body.todo_completed;

            todo.save().then(todo =>{
                res.json('todo updated')
            })
            .catch(err =>{
                res.send(400).send("upate not possible");
            });
    });
})
app.use('/todos', todoRoutes);
app.listen(PORT, ()=>{
    console.log("server is running on Port:"+PORT)
});