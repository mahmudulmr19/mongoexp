import { Schema, Document, model } from "mongoose";
import { User } from "./user.validator";
import bcrypt from "bcrypt";

const userSchema = new Schema<User & Document>({
  userId: {
    type: Number,
    unique: true,
    required: [true, "userId is required"],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    maxlength: [20, "password can not be more than 20 characters"],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  isActive: {
    type: Boolean,
    required: [true, "is active is required"],
  },
  hobbies: {
    type: [String],
    required: [true, "hobbies are required"],
  },
  address: {
    street: {
      type: String,
      required: [true, "street is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
  },
});

// pre save middleware/ hook : will work on create()  save()
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// post save middleware / hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Customizing toJSON to exclude the password field
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id; // Map _id to id
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Exclude password from the returned JSON
  },
});

export const UserModel = model<User & Document>("User", userSchema);
