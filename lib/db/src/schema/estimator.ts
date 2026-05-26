import { pgTable, text, serial, timestamp, doublePrecision, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const estimatorSubmissionsTable = pgTable("estimator_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  message: text("message"),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  roofSqft: integer("roof_sqft").notNull(),
  sqftSource: text("sqft_source").notNull(),
  serviceType: text("service_type").notNull(),
  estimatedCostUsd: integer("estimated_cost_usd").notNull(),
  pricePerSqft: doublePrecision("price_per_sqft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEstimatorSubmissionSchema = createInsertSchema(estimatorSubmissionsTable).omit({ id: true, createdAt: true });
export type InsertEstimatorSubmission = z.infer<typeof insertEstimatorSubmissionSchema>;
export type EstimatorSubmission = typeof estimatorSubmissionsTable.$inferSelect;
