import { IUserRepository, IUserService, User } from "types/Users.types";
import { Router } from "express";
import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { RolesService } from "@services/Roles.service";
import { IRolesRepository, IRolesService, Roles } from "types/Roles.types";
import { RolesRepository } from "@repositories/roles.repository";

const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export default () => {
  router.get("/health", (req, res) => {
    res.send("API is running");
  });

  // User routes
  router.get("/users", async (req, res) => {
    const users = await userService.findUsers();
    res.json(users);
  });

  router.post("/users", async (req, res) => {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);
    res.json(result);
  });

  router.get("/users/:id", async (req, res) => {
    const users = await userService.findUserById(req.params.id);
    res.json(users);
  });

  router.put("/users/:id", async (req, res) => {
    const users = await userService.updateUser(req.params.id, req.body);
    res.json(users);
  });

  router.delete("/users/:id", async (req, res) => {
    const users = await userService.deleteUser(req.params.id);
    res.json(users);
  });

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
