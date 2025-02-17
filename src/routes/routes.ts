import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUserById,
  findUsers,
  updateUser,
} from "@controllers/users.controllers";
import {
  createRoles,
  deleteRoles,
  findRoles,
  findRolesById,
  updateRoles,
} from "@controllers/roles.controller";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("API is running");
  });

  // User routes
  router.get("/users", findUsers);
  router.post("/users", createUser);
  router.get("/users/:id", findUserById);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);

  // Roles routes
  router.get("/roles", findRoles);
  router.post("/roles", createRoles);
  router.get("/roles/:id", findRolesById);
  router.put("/roles/:id", updateRoles);
  router.delete("/roles/:id", deleteRoles);

  return router;
};
