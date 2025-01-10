import { z } from 'zod'

const transactionFormSchema = z.object({
  transactionType: z
    .enum(['income', 'expense']),
  categoryId: z
    .coerce.number()
    .positive('Please select a category'),
  taransactionDate: z
    .date()
    .max(new Date(), 'Transaction date cannot be in the future'),
  amount: z
    .coerce.number()
    .positive('Amount must be greater than 0'),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters')
})

export function TransactionForm() {
  return <div>Transaction Form</div>
}