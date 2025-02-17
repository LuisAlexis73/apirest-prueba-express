import { Repository } from "./Repository.types";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface IUserRepository extends Repository<User> {}

export interface IUserService {
  createUser(user: User): Promise<User>;
  findUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
