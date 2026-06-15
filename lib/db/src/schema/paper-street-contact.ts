import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const paperStreetContactsTable = pgTable("paper_street_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPaperStreetContactSchema = createInsertSchema(paperStreetContactsTable).omit({ id: true, createdAt: true });
export type InsertPaperStreetContact = z.infer<typeof insertPaperStreetContactSchema>;
export type PaperStreetContact = typeof paperStreetContactsTable.$inferSelect;
