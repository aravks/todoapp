const moongoose = require('mongoose');
const todoSchema = require('../model/todoModel');

const addTodoItems = (req, res) => {
  const newItem = new todoSchema(req.body);

  newItem.save((err, item) => {
    err && res.send(err);
    res.json(item);
  });
};

const getAllTodoItems = (req, res) => {
  todoSchema.find({}, (err, items) => {
    err && res.send(err);
    res.json(items);
  });
};

const updateItem = (req, res) => {
  todoSchema.findOneAndUpdate(
    { _id: req.params.todoId },
    req.body,
    { new: true },
    (err, item) => {
      err && res.send(err);
      res.json(item);
    }
  );
};

const deleteItem = (req, res) => {
  todoSchema.deleteOne({ _id: req.params.todoId }, (err) => {
    err && res.send(err);
    res.json({ message: 'Deleted Successfully' });
  });
};

module.exports = { addTodoItems, getAllTodoItems, deleteItem, updateItem };
