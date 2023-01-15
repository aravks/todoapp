const {
  addTodoItems,
  getAllTodoItems,
  deleteItem,
  updateItem,
} = require('../controller/todoControl');

const routes = (app) => {
  app
    .route('/todos')
    // POST endpoint
    .post(addTodoItems)
    //GET endpoint
    .get(getAllTodoItems);

  app
    .route('/todo/:todoId')
    //DELETE endpoint
    .delete(deleteItem)
    //UPDATE endpoint
    .put(updateItem);
};

module.exports = { routes };
