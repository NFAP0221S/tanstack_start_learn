import { createServerFn } from "@tanstack/start"
import { addDays } from "date-fns"
import { z } from "zod"

export const transactionSchema = z.object({
    transactionType: z
      .enum(['income', 'expense']),
    categoryId: z
      .coerce.number()
      .positive('Please select a category'),
    transactionDate: z.string().refine((value) => {
        const parsedDate = new Date(value)
        return !isNaN(parsedDate.getTime()) && parsedDate <= addDays(new Date(), 1)
    }),
    amount: z
      .coerce.number()
      .positive('Amount must be greater than 0'),
    description: z
      .string()
      .min(3, 'Description must contain at least 3 characters')
      .max(300, 'Description must contain a maximum of 300 characters')
  })
  
export const createTransaction = createServerFn({
  method: "POST"
}).validator((data: z.infer<typeof transactionSchema>) => {
    transactionSchema.parse(data)
}).handler(async (data) => {
    
})