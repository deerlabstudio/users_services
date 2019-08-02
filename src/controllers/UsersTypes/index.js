const boom = require('boom');
const usersTypesRepository = require('../../repositories/userstypes-repository');

class UsersTypesController {
  constructor(router) {
    this.router = router;
    this.router.get('/userstypes', this.getAllUsersTypes);
    this.router.get('/userstypes/:id', this.getOneUsersTypes);
    this.router.post('/userstypes', this.storeUsersType);
    this.router.put('/userstypes/:id', this.updateUsersTypes);
    this.router.delete('/userstypes/:id', this.destroyUsersTypes);
  }

  async getAllUsersTypes(req, res, next) {
    try {
      const list = await usersTypesRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneUsersTypes(req, res, next) {
    try {
      const { id } = req.params;
      const item = await usersTypesRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storeUsersType(req, res, next) {
    try {
      const { body } = req;
      const item = await usersTypesRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateUsersTypes(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const item = await usersTypesRepository.update(id, body);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async destroyUsersTypes(req, res, next) {
    try {
      const { id } = req.params;
      const item = await usersTypesRepository.destroy(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UsersTypesController;
