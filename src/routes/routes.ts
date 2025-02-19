import { Router, RequestHandler } from "express";
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
import { loginUser, registerUser } from "@controllers/auth/auth.controller";
import {
  findPosts,
  findPostsById,
  createPosts,
  updatePosts,
  deletePosts,
} from "@controllers/posts.controller";
import { getPermissions, verifyToken } from "middlewares/auth";
import { checkRoles } from "middlewares/roles";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("API is running");
  });

  // Auth routes
  router.post(
    "/auth/register",
    checkRoles as RequestHandler,
    registerUser as RequestHandler
  );
  router.post("/auth/login", loginUser as RequestHandler);

  // User routes
  router.get(
    "/users",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    findUsers
  );
  router.post(
    "/users",
    verifyToken as RequestHandler,
    checkRoles as RequestHandler,
    createUser
  );
  router.get(
    "/users/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    findUserById
  );
  router.put(
    "/users/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    updateUser
  );
  router.delete(
    "/users/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    deleteUser
  );

  // Roles routes
  router.get(
    "/roles",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    findRoles
  );
  router.post(
    "/roles",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    createRoles
  );
  router.get(
    "/roles/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    findRolesById
  );
  router.put(
    "/roles/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    updateRoles
  );
  router.delete(
    "/roles/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    deleteRoles
  );

  // Posts Routes
  router.get("/posts", findPosts);
  router.post(
    "/posts",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    createPosts
  );
  router.get("/posts/:id", verifyToken as RequestHandler, findPostsById);
  router.put(
    "/posts/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    updatePosts
  );
  router.delete(
    "/posts/:id",
    verifyToken as RequestHandler,
    getPermissions as RequestHandler,
    deletePosts
  );

  return router;
};
