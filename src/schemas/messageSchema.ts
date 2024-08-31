import {z} from "zod"


export const MessageSchema = z.object({
    content: z
    .string()
    .min(10, {message: 'content alteast of 10 characters'})
    .max(300, {message:'message must not be greater than 300 characters'})

})