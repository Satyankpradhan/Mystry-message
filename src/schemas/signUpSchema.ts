import {z} from 'zod'

export const usernameValidation = z
 .string()
 .min(2, "Username must be atleast 2 character")
 .max(20, "Must be no more than 20 char")
 .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special character")


 export const singUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'invalid email address'}),
    password: z.string().min(6, {message: 'Password must be of 6 character'})
 })