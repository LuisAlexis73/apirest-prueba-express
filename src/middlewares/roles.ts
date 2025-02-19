import { RolesRepository } from "@repositories/roles.repository";
import { RolesService } from "@services/Roles.service";
import { NextFunction, Request, Response } from "express";
import { IRolesRepository, IRolesService } from "types/Roles.types";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const checkRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
  const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];

  console.log("role :>> ", role);

  try {
    const findRoles = await rolesService.findRoles({ name: { $in: role } });

    if (findRoles.length === 0) {
      return res.status(404).send("Role not found");
    }

    req.body.roles = findRoles.map((role) => role._id);
    console.log("req.body.roles :>> ", req.body.roles);

    next();
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
