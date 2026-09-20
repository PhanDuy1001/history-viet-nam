import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;