import { RolesModel } from "@models/Roles";
import { Query } from "types/Repository.types";
import { IRolesRepository, Roles } from "types/Roles.types";

export class RolesRepository implements IRolesRepository {
  private roles: Roles[] = [];

  async create(roles: Roles): Promise<Roles> {
    const newRoles = new RolesModel(roles);

    return await newRoles.save();
  }

  async find(query?: Query): Promise<Roles[]> {
    return await RolesModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Roles | null> {
    return await RolesModel.findById(id).exec();
  }

  async update(id: string, roles: Partial<Roles>): Promise<Roles | null> {
    return await RolesModel.findByIdAndUpdate(id, roles, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await RolesModel.findByIdAndDelete(id).exec();
    return !!deleted;
  }
}
