const boom = require('boom');
const usersRepository = require('../../repositories/users-repository');

class UsersController {
  constructor(router) {
    this.router = router;
    this.router.get('/users', this.getAllUsers);
    this.router.get('/usersByCompany', this.getUsersByCompany);
    this.router.get('/users/:id', this.getOneUsers);
    this.router.post('/users', this.storeUsers);
    this.router.put('/users/:id', this.updateUsers);
    this.router.delete('/users/:id', this.destroyUsers);
  }

  async getAllUsers(req, res, next) {
    try {
      const list = await usersRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getUsersByCompany(req, res, next) {
    try {
      const { company } = req.query;
      const list = await usersRepository.byCompany(company);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneUsers(req, res, next) {
    try {
      const { id } = req.params;
      const item = await usersRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeUsers(req, res, next) {
    try {
      const { body } = req;
      const item = await usersRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateUsers(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await usersRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyUsers(req, res, next) {
    try {
      const { id } = req.params;
      const item = await usersRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
