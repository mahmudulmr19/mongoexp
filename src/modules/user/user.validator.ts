import { z } from "zod";

export const userSchema = z.object({
  userId: z.number({ required_error: "userId is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z.string({ required_error: "password is required" }),
  fullName: z.object({
    firstName: z.string({ required_error: "first name is required" }),
    lastName: z.string({ required_error: "last name is required" }),
  }),
  age: z.number({ required_error: "age is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  isActive: z.boolean({ required_error: "is active is required" }),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string({ required_error: "street is required" }),
    city: z.string({ required_error: "city is required" }),
    country: z.string({ required_error: "country is required" }),
  }),
});

export type User = z.infer<typeof userSchema>;
