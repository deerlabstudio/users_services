const { UsersTypes } = require('../database/models');

const all = async () => {
  const list = await UsersTypes.findAll();
  return list;
};

const one = async (id) => {
  const item = await UsersTypes.findOne({ where: { id } });
  return item;
};

module.exports = {
  all,
  one,
};
