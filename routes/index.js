const notesRoute = require('./notes.route');
const authRoute = require('./auth.route');

module.exports = (app) => {
  app.use('/notes', notesRoute);
  app.use('/auth', authRoute);
};
