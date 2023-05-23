'use strict';
const faker = require('faker')
const {User,Car} = require("../models");
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
    faker.date.format = 'YYYY-MM-DD'

    const users = await User.findAll({ attributes: ['id'] });
    const userIds = users.map(user => user.id);

    const cars = await Car.findAll({ attributes: ['id'] });
    const carIds = cars.map(car => car.id);

    const rentalsData = [];

    for (let i = 0; i < 15; i++) {
      const rental = {
        user_id: userIds[i],
        car_id: carIds[i],
        start_date: faker.date.past(),
        end_date: faker.date.future(),
        status: faker.random.arrayElement(['pending', 'completed']),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      rentalsData.push(rental);
    }

    await queryInterface.bulkInsert('Rentals', rentalsData, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkInsert('Rentals', null, {});
  }
};
