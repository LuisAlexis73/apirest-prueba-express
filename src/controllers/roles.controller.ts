import { RolesRepository } from "@repositories/roles.repository";
import { RolesService } from "@services/Roles.service";
import { IRolesRepository, IRolesService, Roles } from "types/Roles.types";
import { Request, Response } from "express";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const findRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.findRoles();

    if (roles.length === 0) {
      res.status(404).json({ message: "No roles found" });
    }

    res.json(roles);
  } catch (error) {
    console.log("Error finding roles", error);
    res.status(500).json(error);
  }
};

export const findRolesById = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.findRolesById(req.params.id);

    if (!roles) {
      res.status(404).json({ message: "Role not found" });
    }

    res.json(roles);
  } catch (error) {
    console.log("Error finding role", error);
    res.status(500).json(error);
  }
};

export const createRoles = async (req: Request, res: Response) => {
  try {
    const newRole: Roles = req.body;
    const result = await rolesService.createRoles(newRole);

    res.status(201).json(result);
  } catch (error) {
    console.log("Error creating role", error);
    res.status(400).json(error);
  }
};

export const updateRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.updateRoles(req.params.id, req.body);

    if (!roles) {
      res.status(404).json({ message: "Role not found" });
    }

    res.json(roles);
  } catch (error) {
    console.log("Error updating Role", error);
    res.status(500).json(error);
  }
};

export const deleteRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesService.deleteRoles(req.params.id);

    if (!roles) {
      res.status(404).json({ message: "Role not found" });
    }

    res.json(roles);
  } catch (error) {
    console.log("Error deleting role", error);
    res.status(500).json(error);
  }
};
