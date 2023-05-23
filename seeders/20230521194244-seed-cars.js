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

    const carsData = [];
    for (let i = 0; i < 30; i++) {
      const car = {
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.datatype.number({ min: 2000, max: 2023 }),
        color: faker.vehicle.color(),
        price: faker.datatype.number({ min: 100, max: 2000 }),
        status: faker.datatype.boolean(),
        picture:faker.image.imageUrl(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      carsData.push(car);
    }

    await queryInterface.bulkInsert('Cars', carsData, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
