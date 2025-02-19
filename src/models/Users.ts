import mongoose, { Schema } from "mongoose";
import { User } from "types/Users.types";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    permissions: { type: [String], default: [] },
    roles: [{ ref: "Roles", type: Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password as string, salt);
    this.password = hash;
  }
  next();
});

UserSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password as string);
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = mongoose.model<User>("User", UserSchema);
