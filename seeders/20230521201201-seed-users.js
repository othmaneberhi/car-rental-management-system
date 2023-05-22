'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

//     const usersData = [];
//     for (let i = 0; i < 30; i++) {
//       const user = {
//         first_name: faker.name.firstName(),
//         last_name: faker.name.lastName(),
//         phone: faker.phone.phoneNumber(),
//         email: faker.internet.email(),
//         address: faker.address.streetAddress(),
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.recent(),
//         picture: faker.image.avatar(),
//       };
//
//       usersData.push(user);
//     }
//
//     await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('Users', null, {});
  }
};
