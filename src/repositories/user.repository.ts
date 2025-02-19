import { UserModel } from "@models/Users";
import { IUserRepository, User } from "types/Users.types";
import { Query } from "types/Repository.types";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);

    return await newUser.save();
  }

  async find(query?: Query): Promise<User[]> {
    return await UserModel.find(query || {})
      .populate("roles")
      .exec();
  }

  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query).populate("roles").exec();
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).populate("roles").exec();
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true })
      .populate("roles")
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await UserModel.findByIdAndDelete(id).exec();
    return !!deleted;
  }
}
