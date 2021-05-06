const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
} = require("../util/knexQueries");

usersRouter.param("id", async (req, res, next, id) => {
  const user = await getUserById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(404).send();
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", (req, res, next) => {
  res.status(200).json(req.user);
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const userToAdd = await addUser(req.body);
    const addedUser = await getUserById(userToAdd[0]);
    res.status(201).json(addedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await updateUser(req.params.id, req.body);
    const updatedUser = await getUserById(userToUpdate[0]);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
