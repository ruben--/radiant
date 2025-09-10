import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { siteContent } from '@/lib/schema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getFileContent, setFileContent } from '@/lib/file-storage'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  
  if (!key) {
    return NextResponse.json({ error: 'Key parameter required' }, { status: 400 })
  }

  try {
    const result = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.key, key))
      .limit(1)

    if (result.length === 0) {
      // Return default value if not found
      const defaultValues: Record<string, string> = {
        'hero-title': 'Close every deal.',
        'hero-subtitle': 'Radiant helps you sell more by revealing sensitive information about your customers.',
        'button-1': 'Get started',
        'button-2': 'See pricing'
      }
      
      return NextResponse.json({ 
        key, 
        value: defaultValues[key] || 'Default value'
      })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.warn('Database not available, using file storage:', error.message)
    
    // Fallback to file storage
    try {
      const defaultValues: Record<string, string> = {
        'hero-title': 'Close every deal.',
        'hero-subtitle': 'Radiant helps you sell more by revealing sensitive information about your customers.',
        'button-1': 'Get started',
        'button-2': 'See pricing'
      }
      
      const value = await getFileContent(key, defaultValues[key] || 'Default value')
      
      return NextResponse.json({ 
        key, 
        value
      })
    } catch (fileError) {
      console.error('File storage also failed:', fileError)
      const defaultValues: Record<string, string> = {
        'hero-title': 'Close every deal.',
        'hero-subtitle': 'Radiant helps you sell more by revealing sensitive information about your customers.',
        'button-1': 'Get started',
        'button-2': 'See pricing'
      }
      
      return NextResponse.json({ 
        key, 
        value: defaultValues[key] || 'Default value'
      })
    }
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let key: string, value: string

  try {
    const body = await request.json()
    key = body.key
    value = body.value
    
    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value required' }, { status: 400 })
    }

    // Insert or update
    const result = await db
      .insert(siteContent)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value, updatedAt: new Date() }
      })
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.warn('Database error, using file storage fallback:', error)
    
    // Fallback to file storage
    try {
      if (!key || !value) {
        return NextResponse.json({ error: 'Key and value required' }, { status: 400 })
      }
      
      await setFileContent(key, value)
      
      return NextResponse.json({ 
        key, 
        value,
        updatedAt: new Date().toISOString()
      })
    } catch (fileError) {
      console.error('Both database and file storage failed:', fileError)
      return NextResponse.json({ 
        error: 'Storage not available.' 
      }, { status: 500 })
    }
  }
}