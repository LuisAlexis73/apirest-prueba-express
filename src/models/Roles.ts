import { Roles } from "types/Roles.types";
import mongoose, { Schema } from "mongoose";

const RolesSchema: Schema = new Schema<Roles>(
  {
    name: { type: String, required: true, unique: true },
    permissions: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RolesModel = mongoose.model<Roles>("Roles", RolesSchema);
