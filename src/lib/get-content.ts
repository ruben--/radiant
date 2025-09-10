import { eq } from 'drizzle-orm'
import { db } from './db'
import { siteContent } from './schema'
import { getFileContent } from './file-storage'

export async function getContent(key: string, defaultValue: string = ''): Promise<string> {
  try {
    const result = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.key, key))
      .limit(1)

    if (result.length === 0) {
      return defaultValue
    }

    return result[0].value
  } catch (error) {
    console.warn(`Database not available for key "${key}", using file storage:`, error.message)
    
    // Fallback to file storage
    try {
      return await getFileContent(key, defaultValue)
    } catch (fileError) {
      console.warn(`File storage also failed for key "${key}", using default:`, fileError.message)
      return defaultValue
    }
  }
}