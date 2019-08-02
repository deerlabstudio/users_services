const express = require('express');

const userServices = require('../../repositories/users-repository');

class UsersController {
  constructor() {
    this.router = express.Router();
    this.router.get('/users', this.getAll);
  }

  getAll(req, res) {
    const list = userServices.all();
    res.send(list);
  }
}

module.exports = UsersController;
