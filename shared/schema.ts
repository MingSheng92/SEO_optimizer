import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const seoAnalyses = pgTable("seo_analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  keywords: text("keywords"),
  canonical: text("canonical"),
  openGraphTags: jsonb("open_graph_tags"),
  twitterTags: jsonb("twitter_tags"),
  overallScore: integer("overall_score"),
  warningCount: integer("warning_count"),
  errorCount: integer("error_count"),
  passedCount: integer("passed_count"),
  createdAt: text("created_at").notNull(),
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalyses).omit({
  id: true,
});

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalyses.$inferSelect;

// SEO Analysis Response Types
export const seoAnalysisResponseSchema = z.object({
  url: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  keywords: z.string().nullable(),
  canonical: z.string().nullable(),
  openGraphTags: z.object({
    title: z.boolean(),
    description: z.boolean(),
    image: z.boolean(),
    url: z.boolean(),
    type: z.boolean(),
    site_name: z.boolean(),
    locale: z.boolean(),
  }),
  twitterTags: z.object({
    card: z.string().nullable(),
    site: z.string().nullable(),
    creator: z.string().nullable(),
    title: z.boolean(),
    description: z.boolean(),
    image: z.boolean(),
  }),
  overallScore: z.number(),
  warningCount: z.number(),
  errorCount: z.number(),
  passedCount: z.number(),
});

export type SeoAnalysisResponse = z.infer<typeof seoAnalysisResponseSchema>;
