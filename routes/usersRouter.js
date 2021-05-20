const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const checkAuth = require("../util/checkAuth");
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
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.id = id;
  next();
});

/*
//TODO: this should only be accessible by admin
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
*/

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     description: Get data for a logged-in user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: User id
 *         in: req.user
 *         required: true
 *         type: uuid
 *     responses:
 *       200:
 *         description: Object with user data
 *         schema:
 *           user_id:
 *             type: uuid
 *           email:
 *             type: string
 *           last_name:
 *             type: string
 *           first_name:
 *             type: string
 *           example: { user_id: 123e4567-e89b-12d3-a456-426614174001, email: email1@email.com, last_name: Bobberson, first_name: Bob }
 */

usersRouter.get("/me", checkAuth, (req, res, next) => {
  const { user_id, email, last_name, first_name } = req.user;
  res.status(200).json({ user_id, email, last_name, first_name });
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email address
 *         in: body
 *         required: true
 *         example: email1@email.com
 *       - name: password
 *         description: Password
 *         in: body
 *         required: true
 *         example: password
 *       - name: last_name
 *         description: Last name
 *         in: body
 *         required: true
 *         example: Bobberson
 *       - name: first_name
 *         description: First name
 *         in: body
 *         required: true
 *         example: Bob
 *     responses:
 *        200:
 *          description: ID of created user
 *          schema:
 *            user_id:
 *              type: uuid
 *            example: { user_id: 123e4567-e89b-12d3-a456-426614174006 }
 */

usersRouter.post("/register", async (req, res, next) => {
  try {
    const userToAdd = await addUser(req.body);
    const addedUser = await getUserById(userToAdd);
    res.status(201).json(addedUser);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a user
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: Parameters to update
 *         schema:
 *           enum: [email, password, last_name, first_name]
 *           example: { password: newpass, first_name: Michael }
 *     responses:
 *       201:
 *         description: ID of successfully updated user
 *         schema:
 *           user_id:
 *             type: uuid
 *           example: { user_id: 123e4567-e89b-12d3-a456-426614174001 }
 *       422:
 *         description: ID was included in parameter to update, which is not allowed
 *         schema:
 *           error:
 *             type: string
 *           example: ID cannot be updated
 *
 */

usersRouter.put("/me", async (req, res, next) => {
  if (req.body.hasOwnProperty("user_id")) {
    return res.status(422).json({
      error: "ID cannot be updated",
    });
  }
  try {
    const { user_id } = req.user;
    const userToUpdate = await updateUser(user_id, req.body);
    const updatedUser = await getUserById(userToUpdate);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         description: The id of the user to be deleted
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success message
 *         schema:
 *           message:
 *             type: string
 *           example: User with id 123e4567-e89b-12d3-a456-426614174001 deleted
 */

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
