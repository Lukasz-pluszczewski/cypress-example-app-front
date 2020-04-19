const cucumber = require('cypress-cucumber-preprocessor').default
const cleanDB = require('./cleanDBTask');

module.exports = (on) => {
  on('file:preprocessor', cucumber());
  on('task', {
    cleanDB,
  })
}
