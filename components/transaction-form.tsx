import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Select, SelectItem, SelectTrigger } from './ui/select'
import { SelectContent, SelectValue } from '@radix-ui/react-select'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Input } from './ui/input'
import { categoriesTable } from '@/db/schema'

const transactionFormSchema = z.object({
  transactionType: z
    .enum(['income', 'expense']),
  categoryId: z
    .coerce.number()
    .positive('Please select a category'),
  transactionDate: z
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

export function TransactionForm({
  categories,
}: {
  categories: (typeof categoriesTable.$inferSelect)[]
}) {

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      transactionType: 'income',
      amount: 0,
      categoryId: 0,
      description: '',
      transactionDate: new Date(),
    }
  })

  const handleSubmit = (data: z.infer<typeof transactionFormSchema>) => {
    console.log({data})
  }

  const filteredCategories = categories.filter(cat => cat.type === form.getValues('transactionType'))

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <fieldset 
        className='grid grid-cols-2 gap-y-5 gap-x-2'
        disabled={form.formState.isSubmitting}
      >
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
        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => {
            return(
              <FormItem>
                <FormLabel> 
                  Category
                </FormLabel>
                <FormControl>
                  <Select value={field.value.toString()} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Transaction Type' />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='transactionDate'
          render={({ field }) => {
            return(
              <FormItem>
                <FormLabel> 
                  Transaction Date
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{
                          after: new Date(),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => {
            return(
              <FormItem>
                <FormLabel> 
                  Amount
                </FormLabel>
                <FormControl>
                  <Input {...field} type='number' step={0.01} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </fieldset>
      <fieldset 
        className='mt-5 flex flex-col gap-5'
        disabled={form.formState.isSubmitting}
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => {
            return(
              <FormItem>
                <FormLabel> 
                  Discription
                </FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button type='submit'>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </fieldset>
    </form>
  </Form>
}