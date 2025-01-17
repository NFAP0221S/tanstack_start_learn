import { desc } from "drizzle-orm";
import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    type: text({
        enum: ["expense", "income"]
    }).notNull(),
})

export const transactionsTable = pgTable("transactions", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    description: text().notNull(),
    amount: numeric().notNull(),
    transactionDate: date("transaction_date").notNull(),
    categoryId: integer("category_id").references(() => categoriesTable.id).notNull(),
})