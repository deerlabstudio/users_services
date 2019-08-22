const bcrypt = require('bcryptjs');
const { Users, UsersTypes } = require('../database/models');

const saltRounds = 10;

const all = async () => {
  const list = await Users.findAll({
    include: [UsersTypes],
  });
  return list;
};

const byCompany = async (company) => {
  const list = await Users.findAll({
    where: { company },
    include: [UsersTypes],
  });
  return list;
};

const one = async (id) => {
  const item = await Users.findOne({ where: { id }, include: [UsersTypes] });
  return item;
};

const store = async (user) => {
  const saltToUse = bcrypt.genSaltSync(saltRounds);
  const securePassword = bcrypt.hashSync(user.password, saltToUse);
  const item = await Users.create({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    salt: saltToUse,
    password: securePassword,
    avatar: '',
    status: true,
    usersTypesId: user.usersTypesId,
    company: user.company,
  });
  return item;
};

const update = async (id, user) => {
  let item = await Users.update({
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: '',
    status: true,
    usersTypesId: user.usersTypesId,
    company: user.company,
  }, { where: { id } });

  if (item[0] === 1) {
    item = await Users.findOne({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

const destroy = async (id) => {
  let item = await Users.findOne({ where: { id } });
  if (item) {
    await Users.destroy({ where: { id } });
  } else {
    item = null;
  }
  return item;
};

module.exports = {
  all,
  byCompany,
  one,
  store,
  update,
  destroy,
};
