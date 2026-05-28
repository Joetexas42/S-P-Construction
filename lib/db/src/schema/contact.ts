import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  serviceType: text("service_type").notNull(),
  propertyType: text("property_type"),
  message: text("message").notNull(),
  preferredContact: text("preferred_contact"),
  city: text("city"),
  serviceContext: text("service_context"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissionsTable).omit({ id: true, createdAt: true });
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
