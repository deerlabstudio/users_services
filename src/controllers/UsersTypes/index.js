const boom = require('boom');
const usersTypesRepository = require('../../repositories/userstypes-repository');

class UsersTypesController {
  constructor(router) {
    this.router = router;
    this.router.get('/userstypes', this.getAllUsers);
    this.router.get('/userstypes/:id', this.getOneUser);
  }

  async getAllUsers(req, res, next) {
    try {
      const list = await usersTypesRepository.all();
      res.send(list);
    } catch (error) {
      next(error);
    }
  }

  async getOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const item = await usersTypesRepository.one(id);
      if (item) {
        res.send(item);
      }
      return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersTypesController;
