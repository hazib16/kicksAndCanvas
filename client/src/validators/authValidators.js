import { z } from "zod";

//signup schema
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
  
  
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
  
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .trim(),
  
  referralCode: z
    .string()
    .optional(),
    

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Show error on confirmPassword field
});

//login schema
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

//admin login schema
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
