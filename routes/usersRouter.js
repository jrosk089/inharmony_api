const express = require('express');
const usersRouter = express.Router({ mergeParams: true });
const { getUsers, getUsersById, addUser } = require('../util/queries');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUsersById);

usersRouter.post('/', addUser);

module.exports = usersRouter;
