import { z } from "zod";

export const orderSchema = z.object({
  productName: z.string({ required_error: "product name is required" }),
  price: z.number({ required_error: "price is required" }),
  quantity: z.number({ required_error: "quantity is required" }),
});

export const userZodSchema = z.object({
  userId: z.number({ required_error: "userId is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters" }),
  fullName: z.object({
    firstName: z.string({ required_error: "first name is required" }),
    lastName: z.string({ required_error: "last name is required" }),
  }),
  age: z.number({ required_error: "age is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" }),
  isActive: z.boolean({ required_error: "is active is required" }),
  hobbies: z.array(z.string()).nonempty({ message: "hobbies are required" }),
  address: z.object({
    street: z.string({ required_error: "street is required" }),
    city: z.string({ required_error: "city is required" }),
    country: z.string({ required_error: "country is required" }),
  }),
  orders: z.array(orderSchema).optional(),
});

export type Order = z.infer<typeof orderSchema>;
export type User = z.infer<typeof userZodSchema>;
