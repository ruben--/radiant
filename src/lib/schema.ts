import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const siteContent = pgTable('site_content', {
  id: serial('id').primaryKey(),
  key: text('key').unique().notNull(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type SiteContent = typeof siteContent.$inferSelect
export type NewSiteContent = typeof siteContent.$inferInsert