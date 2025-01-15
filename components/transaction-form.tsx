import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectItem, SelectTrigger } from './ui/select'
import { SelectContent, SelectValue } from '@radix-ui/react-select'

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
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionType: 'income',
      amount: 0,
      categoryId: 0,
      description: '',
      taransactionDate: new Date(),
    }
  })
  return <Form {...form}>
    <form>
      <fieldset className='grid grid-cols-2 gap-y-5 gap-x-2'>
        <FormField
          control={form.control}
          name='transactionType'
          render={({ field }) => {
            return(
              <FormItem>
                <FormLabel>
                  Transaction Type
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Transaction Type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='income'>Income</SelectItem>
                      <SelectItem value='expense'>Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </fieldset>
    </form>
  </Form>
}