'use strict';
/** @type {import('sequelize-cli').Migration} */
const {User} = require('../models');
const faker = require('faker');
const bcrypt = require("bcryptjs");

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

    // const users = await User.findAll({ attributes: ['id'] });
    // const userIds = users.map(user => user.id);
    //
    // const adminUser = await User.findOne({where:{
    //   email:'admin@gmail.com'
    // }})
    //
    // const accountsData = [];
    //
    //
    // for (let i = 0; i < userIds.length; i++) {
    //   const account = {
    //     user_id: userIds[i],
    //     password: await bcrypt.hash('1234', 10),
    //     isAdmin: userIds[i]===adminUser.id,
    //     createdAt: faker.date.past(),
    //     updatedAt: faker.date.recent(),
    //   };
    //
    //   accountsData.push(account);
    // }



    //await queryInterface.bulkInsert('Accounts', accountsData, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //await queryInterface.bulkInsert('Accounts', null, {});
  }
};
