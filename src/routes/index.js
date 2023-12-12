const { Router } = require('express');

const usersRoutes = require('./users.routes');
const movieNotesRoutes = require('./movie_notes.routes');
const sessionRoutes = require('./sessions.routes');

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/movie_notes", movieNotesRoutes);

module.exports = routes;