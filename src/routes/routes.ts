import { IUserRepository, IUserService, User } from "types/Users.types";
import { Router } from "express";
import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { RolesService } from "@services/Roles.service";
import { IRolesRepository, IRolesService, Roles } from "types/Roles.types";
import { RolesRepository } from "@repositories/roles.repository";
import {
  createUser,
  deleteUser,
  findUserById,
  findUsers,
  updateUser,
} from "@controllers/users.controllers";

const router = Router();

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

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
  router.get("/roles", async (req, res) => {
    const roles = await rolesService.findRoles();
    res.json(roles);
  });

  router.post("/roles", async (req, res) => {
    const newRoles: Roles = req.body;
    const result = await rolesService.createRoles(newRoles);
    res.json(result);
  });

  router.get("/roles/:id", async (req, res) => {
    const roles = await rolesService.findRolesById(req.params.id);
    res.json(roles);
  });

  router.put("/roles/:id", async (req, res) => {
    const roles = await rolesService.updateRoles(req.params.id, req.body);
    res.json(roles);
  });

  router.delete("/roles/:id", async (req, res) => {
    const roles = await rolesService.deleteRoles(req.params.id);
    res.json(roles);
  });

  return router;
};
