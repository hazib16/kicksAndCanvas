import { z } from "zod";

//Signup Schema
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .trim(),
  
  referralCode: z
    .string()
    .optional()
    .nullable(),
});

//Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(1, "Password is required"),
});

//Admin login Schema
export const adminLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(1, "Password is required"),
});
