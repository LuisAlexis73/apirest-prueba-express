import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "types/Users.types";
import jwt from "jsonwebtoken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email }: User = req.body;
    const userExist = await userService.findUserByEmail(email);

    if (userExist)
      return res.status(400).json({ message: "Email already exists!" });

    const newUser = await userService.createUser(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error during login", error);
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user)
      return res.status(400).json({ message: "Invalid user or password" });

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword)
      return res.status(400).json({ message: "Invalid user or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json(token);
  } catch (error) {
    console.log("Error during login", error);
    res.status(500).json(error);
  }
};
