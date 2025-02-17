import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/Users.types";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findUsers();

    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.log("Error finding users", error);
    res.status(500).json(error);
  }
};

export const findUserById = async (req: Request, res: Response) => {
  try {
    const users = await userService.findUserById(req.params.id);

    if (!users) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(users);
  } catch (error) {
    console.log("Error finding user", error);
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);

    res.status(201).json(result);
  } catch (error) {
    console.log("Error creating user", error);
    res.status(400).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.updateUser(req.params.id, req.body);

    if (!users) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(users);
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.deleteUser(req.params.id);

    if (!users) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(users);
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).json(error);
  }
};
