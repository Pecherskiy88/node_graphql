const Todo = require('../models/todo');
const todo = require('../models/todo');

module.exports = {
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (e) {
      throw new Error('Fetch todos is not available');
    }
  },
  async createTodo({ todo }) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false,
      });
    } catch (e) {
      throw new Error('Title is required');
    }
  },
  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(id);
      todo.done = true;
      await todo.save();
      return todo;
    } catch (e) {
      throw new Error('id is required');
    }
  },
  async deleteTodo({ id }) {
    try {
      const todos = await Todo.findByPk(id);
      await todos.destroy();
      return true;
    } catch (e) {
      return false;
    }
  },
};
