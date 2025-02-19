import { User } from "../../src/types/Users.types";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
// Esto es una extension de la carpeta types que se encuentra dentro de la carpeta node_modules.
