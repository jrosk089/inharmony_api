const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../util/knexQueries");

usersRouter.param("id", async (req, res, next, id) => {
  if (id.length !== 36) {
    res.status(404).send();
  }
  const user = await getUserById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    console.log("param");
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
  if (req.body.hasOwnProperty("user_id")) {
    return res.status(422).json({
      error: "ID cannot be updated",
    });
  }
  try {
    const userToUpdate = await updateUser(req.params.id, req.body);
    const updatedUser = await getUserById(userToUpdate[0]);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({
      message: `User with ID ${req.params.id} deleted`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
