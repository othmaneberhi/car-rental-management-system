'use strict';
const faker = require('faker')
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
    const rentalsData = [];
//
// Generate 20 rentals
    for (let i = 0; i < 12; i++) {
      const rental = {
        user_id: faker.datatype.number({ min: 1, max: 20 }),
        car_id: faker.datatype.number({ min: 21, max: 39 }),
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
