import { UserRepository } from "@repositories/user.repository";
import { UserService } from "@services/user.service";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Method, permissions } from "../types/Permissions.types";
import { IUserRepository, IUserService, User } from "types/Users.types";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const verify = jwt.verify(token as string, jwtSecret) as User;
    const getUser = await userService.findUserById(verify.id);

    if (!getUser) {
      return res.status(401).send({ message: "User not found" });
    }

    req.currentUser = getUser;

    next();
  } catch (error) {
    console.log("Error :>>", error);
    res.status(401).send(error);
  }
};

export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentUser, method, path } = req;
  const { roles } = currentUser;
  const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
  const findMethod = permissions.find(
    (m) => m.method === Method[method as keyof typeof Method]
  );

  if (
    !findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)
  ) {
    findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
  }
  console.log("findMethod :>> ", findMethod);

  // const rolesPermissions = roles?.map((role) => role.permissions).flat();
  // const mergedPermissions = [new Set(rolesPermissions)];

  // Forma simplificada
  const mergedRolesPermissions = [
    ...new Set(roles?.flatMap((role) => role.permissions)),
  ];
  console.log("mergedRolesPermissions :>> ", mergedRolesPermissions);

  let userPermissions: string[] = [];

  if (currentUser.permissions?.length !== 0) {
    userPermissions = currentUser.permissions!;
  } else {
    userPermissions = mergedRolesPermissions;
  }

  const permissionsGranted = findMethod?.permissions.find((permission) =>
    userPermissions.includes(permission)
  );
  console.log("permissionsGranted :>> ", permissionsGranted);

  if (!permissionsGranted) {
    return res.status(401).send("Unauthorized!");
  }

  next();
};
