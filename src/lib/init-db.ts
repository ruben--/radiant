import { db } from './db'
import { siteContent } from './schema'

export async function initializeDatabase() {
  try {
    // Test database connection first
    await db.select().from(siteContent).limit(1)
    
    // Initialize with default hero title if it doesn't exist
    await db
      .insert(siteContent)
      .values({ 
        key: 'hero-title', 
        value: 'Close every deal.',
        updatedAt: new Date()
      })
      .onConflictDoNothing()
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.warn('Database not available, using fallback values:', error.message)
  }
}