// const dbConfig = require('/db.config')
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(
//     dbConfig .database,
//     dbConfig .username,
//     dbConfig .password,{
//         host: dbConfig .host,
//         dialect: dbConfig .dialect,
//         logging: (query) => {
//             console.log(`Executing query: ${query}`);
//         },
//     });
// sequelize.authenticate()
//     .then(() => {
//         console.log('connected..')
//     })
//     .catch(err => {
//         console.log('Error'+ err)
//     })
//
// const db = {}
//
// db.Sequelize = Sequelize
// db.sequelize = sequelize
//
// module.exports = db