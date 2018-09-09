const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const saltRounds = 10;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    name: process.env.name,
    email: process.env.email,
    password: bcrypt.hashSync(process.env.password, saltRounds),
    role: 0,
    phone_number: process.env.phone_number,
    title: process.env.title,
    street: process.env.street,
    postal_address: process.env.postal_address,
    home_address: process.env.home_address,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
