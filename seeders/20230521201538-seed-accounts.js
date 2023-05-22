'use strict';

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

    const faker = require('faker');

//     const accountsData = [];
//
// // Generate 20 accounts
//     for (let i = 0; i < 20; i++) {
//       const account = {
//         user_id: i + 1,
//         password: faker.internet.password(),
//         isAdmin: i===0,//admin is the first account
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.recent(),
//       };
//
//       accountsData.push(account);
//     }
//
//     await queryInterface.bulkInsert('Accounts', accountsData, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('Accounts', null, {});
  }
};
