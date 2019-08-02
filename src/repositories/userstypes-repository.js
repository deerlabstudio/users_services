const { UsersTypes } = require('../database/models');

const all = async () => {
  const list = await UsersTypes.findAll();
  return list;
};

const one = async (id) => {
  const item = await UsersTypes.findOne({ where: { id } });
  return item;
};

const store = async (usersTypes) => {
  const item = await UsersTypes.create({
    name: usersTypes.name,
    description: usersTypes.description,
  });
  return item;
};

const update = async (id, usersTypes) => {
  let item = await UsersTypes.update({
    name: usersTypes.name,
    description: usersTypes.description,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await UsersTypes.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await UsersTypes.findOne({ where: { id } });
  if (item) {
    await UsersTypes.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  one,
  store,
  update,
  destroy,
};
